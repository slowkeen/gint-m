import React, { useEffect, useMemo, useState } from "react";
import MarkdownIt from "markdown-it";
import AdaptiveGridDemo from "../gint-m-adaptive-grid.jsx";
import GintMMoodboard from "../gint-m-moodboard.jsx";
import competitorsRaw from "../competitors_analysis.md?raw";
import designSystemRaw from "../gint-m-design-system.md?raw";

const md = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: false,
});

function getFirstHeading(source, fallback) {
  const match = source.match(/^#\s+(.+)$/m);
  if (!match) {
    return fallback;
  }
  return match[1].trim();
}

const sections = [
  {
    id: "adaptive-grid",
    file: "gint-m-adaptive-grid.jsx",
    title: "Adaptive Grid Demo",
    type: "jsx",
    component: AdaptiveGridDemo,
  },
  {
    id: "moodboard",
    file: "gint-m-moodboard.jsx",
    title: "Design System Moodboard",
    type: "jsx",
    component: GintMMoodboard,
  },
  {
    id: "competitors-analysis",
    file: "competitors_analysis.md",
    title: getFirstHeading(competitorsRaw, "Competitors Analysis"),
    type: "md",
    source: competitorsRaw,
  },
  {
    id: "design-system",
    file: "gint-m-design-system.md",
    title: getFirstHeading(designSystemRaw, "Design System"),
    type: "md",
    source: designSystemRaw,
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

function MarkdownArticle({ source }) {
  const html = useMemo(() => md.render(source), [source]);
  return <article className="markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function App() {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [showTop, setShowTop] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [viewports, setViewports] = useState(() => {
    const initial = {};
    sections.forEach((section) => {
      if (section.type === "jsx") {
        initial[section.id] = "fluid";
      }
    });
    return initial;
  });

  useEffect(() => {
    const targets = sections
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

  return (
    <div className="page">
      <div className="mobile-header">
        <div className="brand">Gint-M</div>
        <button
          type="button"
          className="mobile-nav-btn"
          onClick={() => setNavOpen(true)}
          aria-expanded={navOpen}
          aria-controls="site-nav"
        >
          Разделы
        </button>
      </div>
      <div
        className={`overlay ${navOpen ? "is-open" : ""}`}
        onClick={() => setNavOpen(false)}
        aria-hidden={!navOpen}
      />
      <aside className={`sidebar ${navOpen ? "is-open" : ""}`} id="site-nav">
        <div className="brand">Gint-M Codex</div>
        <div className="nav-label">Sections</div>
        <nav className="nav">
          {sections.map((section) => (
            <a
              key={section.id}
              className={`nav-item ${activeId === section.id ? "is-active" : ""}`}
              href={`#${section.id}`}
              onClick={() => setNavOpen(false)}
            >
              <span className="nav-title">{section.title}</span>
              <span className="nav-file">{section.file}</span>
            </a>
          ))}
        </nav>
        <div className="nav-note">One file = one section.</div>
      </aside>
      <main className="main">
        {sections.map((section) => {
          const Component = section.component;
          const mode = viewports[section.id] || "fluid";
          const previewWidth = viewportWidths[mode] ?? "100%";
          return (
            <section key={section.id} id={section.id} className={`section section-${section.type}`}>
              <div className="section-head">
                <div className="section-title">{section.title}</div>
                <div className="section-file">{section.file}</div>
              </div>
              {section.type === "jsx" && (
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
                  <MarkdownArticle source={section.source} />
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
