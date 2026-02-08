import React, { useEffect, useMemo, useState } from "react";
import MarkdownIt from "markdown-it";
import AdaptiveGridDemo from "../gint-m-adaptive-grid.jsx";
import GintMMoodboard from "../gint-m-moodboard.jsx";
import competitorsRaw from "../competitors_analysis.md?raw";

const md = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
});

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0400-\u04ff]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

const defaultHeadingOpen =
  md.renderer.rules.heading_open ||
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const level = Number(token.tag.slice(1));
  if (env?.anchorPrefix && level >= 2 && level <= 4) {
    const title = tokens[idx + 1]?.content ?? "";
    const base = slugify(title);
    env.slugCounts ??= {};
    const count = env.slugCounts[base] ?? 0;
    env.slugCounts[base] = count + 1;
    const slug = count ? `${base}-${count + 1}` : base;
    token.attrSet("id", `${env.anchorPrefix}-${slug}`);
  }
  return defaultHeadingOpen(tokens, idx, options, env, self);
};

function getFirstHeading(source, fallback) {
  const match = source.match(/^#\s+(.+)$/m);
  if (!match) {
    return fallback;
  }
  return match[1].trim();
}

function extractHeadings(source, prefix) {
  const lines = source.split(/\r?\n/);
  const counts = {};
  const headings = [];
  lines.forEach((line) => {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (!match) {
      return;
    }
    const level = match[1].length;
    const text = match[2].trim();
    const base = slugify(text);
    const count = counts[base] ?? 0;
    counts[base] = count + 1;
    const slug = count ? `${base}-${count + 1}` : base;
    headings.push({ id: `${prefix}-${slug}`, level, text });
  });
  return headings;
}

function groupHeadings(headings) {
  const groups = [];
  let current = null;
  headings.forEach((heading) => {
    if (heading.level === 2) {
      current = { ...heading, children: [] };
      groups.push(current);
      return;
    }
    if (!current) {
      current = { ...heading, children: [] };
      groups.push(current);
      return;
    }
    current.children.push(heading);
  });
  return groups;
}

const sections = [
  {
    id: "adaptive-grid",
    file: "gint-m-adaptive-grid.jsx",
    title: "Адаптивная сетка проектов",
    subtitle: "Варианты сетки и примеры",
    type: "jsx",
    component: AdaptiveGridDemo,
    showViewport: false,
  },
  {
    id: "moodboard",
    file: "gint-m-moodboard.jsx",
    title: "Мудборд дизайн‑системы",
    subtitle: "Палитра и типографика",
    type: "jsx",
    component: GintMMoodboard,
    showViewport: false,
  },
  {
    id: "competitors-analysis",
    file: "competitors_analysis.md",
    title: getFirstHeading(competitorsRaw, "Competitors Analysis"),
    subtitle: "Рекомендации по сайту",
    type: "md",
    source: competitorsRaw,
  },
];

const viewportOptions = [
  { id: "fluid", label: "Fluid" },
  { id: "desktop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
  { id: "mobile", label: "Mobile" },
];

const viewportWidths = {
  fluid: "100%",
  desktop: 1200,
  tablet: 768,
  mobile: 390,
};

function MarkdownArticle({ source, prefix }) {
  const html = useMemo(() => md.render(source, { anchorPrefix: prefix, slugCounts: {} }), [source, prefix]);
  return <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function App() {
  const sectionList = useMemo(
    () =>
      sections.map((section) =>
        section.type === "md"
          ? (() => {
              const headings = extractHeadings(section.source, section.id);
              return {
                ...section,
                headings,
                headingGroups: groupHeadings(headings),
              };
            })()
          : section
      ),
    []
  );
  const [activeId, setActiveId] = useState(sectionList[0]?.id ?? "");
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initial = {};
    sectionList.forEach((section) => {
      section.headingGroups?.forEach((group, index) => {
        initial[`${section.id}:${group.id}`] = index === 0;
      });
    });
    return initial;
  });
  const [showTop, setShowTop] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [viewports, setViewports] = useState(() => {
    const initial = {};
    sectionList.forEach((section) => {
      if (section.type === "jsx") {
        initial[section.id] = "fluid";
      }
    });
    return initial;
  });

  useEffect(() => {
    const targets = sectionList
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (!targets.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.01,
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const handler = (event) => {
      if (!event.matches) {
        setNavOpen(false);
      }
    };
    handler(media);
    if (media.addEventListener) {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
    media.addListener(handler);
    return () => media.removeListener(handler);
  }, []);

  useEffect(() => {
    if (!navOpen) {
      return undefined;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [navOpen]);

  const setViewport = (sectionId, mode) => {
    setViewports((prev) => ({ ...prev, [sectionId]: mode }));
  };

  const toggleGroup = (sectionId, groupId) => {
    const key = `${sectionId}:${groupId}`;
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="page">
      <div className="mobile-header">
        <div className="brand">ГИНТ‑М</div>
        <button
          type="button"
          className="mobile-nav-btn"
          onClick={() => setNavOpen(true)}
          aria-expanded={navOpen}
          aria-controls="site-nav"
        >
          Содержание
        </button>
      </div>
      <div
        className={`overlay ${navOpen ? "is-open" : ""}`}
        onClick={() => setNavOpen(false)}
        aria-hidden={!navOpen}
      />
      <aside className={`sidebar ${navOpen ? "is-open" : ""}`} id="site-nav">
        <div className="brand">ГИНТ‑М</div>
        <div className="nav-label">Содержание</div>
        <nav className="nav">
          {sectionList.map((section) => (
            <div key={section.id} className="nav-group">
              <div className="nav-header">
                <a
                  className={`nav-item ${activeId === section.id ? "is-active" : ""}`}
                  href={`#${section.id}`}
                  onClick={() => {
                    setNavOpen(false);
                  }}
                >
                  <span className="nav-title">{section.title}</span>
                  <span className="nav-file">{section.subtitle ?? section.file}</span>
                </a>
              </div>
              {section.headingGroups?.length ? (
                <div className="nav-sub">
                  {section.headingGroups.map((group) => {
                    const key = `${section.id}:${group.id}`;
                    const isOpen = !!expandedGroups[key];
                    const hasChildren = group.children?.length;
                    return (
                      <div key={group.id} className="nav-subgroup">
                        <div className="nav-subheader">
                          <a
                            className="nav-subitem level-2"
                            href={`#${group.id}`}
                            onClick={() => setNavOpen(false)}
                          >
                            {group.text}
                          </a>
                          {hasChildren ? (
                            <button
                              type="button"
                              className={`nav-toggle ${isOpen ? "is-open" : ""}`}
                              aria-expanded={isOpen ? "true" : "false"}
                              aria-label="Показать подразделы"
                              onClick={() => toggleGroup(section.id, group.id)}
                            />
                          ) : null}
                        </div>
                        {hasChildren && isOpen ? (
                          <div className="nav-sublist">
                            {group.children.map((child) => (
                              <a
                                key={child.id}
                                className={`nav-subitem level-${child.level}`}
                                href={`#${child.id}`}
                                onClick={() => setNavOpen(false)}
                              >
                                {child.text}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </aside>
      <main className="main">
        {sectionList.map((section) => {
          const Component = section.component;
          const allowViewport = section.type === "jsx" && section.showViewport !== false;
          const mode = allowViewport ? viewports[section.id] || "fluid" : "fluid";
          const previewWidth = viewportWidths[mode] ?? "100%";
          return (
            <section key={section.id} id={section.id} className={`section section-${section.type}`}>
              <div className="section-head">
                <div className="section-title">{section.title}</div>
                <div className="section-file">{section.file}</div>
              </div>
              {allowViewport && (
                <div className="preview-toolbar">
                  <span className="preview-label">Viewport</span>
                  {viewportOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className={`preview-btn ${mode === opt.id ? "is-active" : ""}`}
                      onClick={() => setViewport(section.id, opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
              <div className={`section-body ${section.type === "jsx" ? "jsx-body" : "md-body"}`}>
                {section.type === "md" ? (
                  <MarkdownArticle source={section.source} prefix={section.id} />
                ) : (
                  Component && (
                    <div className="preview-shell" data-viewport={mode}>
                      <div className="preview-frame" style={{ width: previewWidth, maxWidth: "100%" }}>
                        <Component />
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>
          );
        })}
      </main>
      {showTop && (
        <button
          type="button"
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Наверх
        </button>
      )}
    </div>
  );
}

