import { useState } from "react";

const palette = {
  dark: "#1C1C1E",
  light: "#FAF9F7",
  secondary: "#F0EEEA",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  accent: "#C05A3C",
  border: "#E5E2DD",
};

// Simulated project data with mixed aspect ratios
const projects = [
  { id: 1, title: "Штаб-квартира Microsoft", meta: "Офисы · 2023 · 12 000 м²", ratio: "landscape", color: "#2C3E50" },
  { id: 2, title: "Клиника Кит Мед", meta: "Медицинские · 2024 · 3 200 м²", ratio: "portrait", color: "#4A3728" },
  { id: 3, title: "Офис SAP", meta: "Офисы · 2022 · 8 500 м²", ratio: "landscape", color: "#2E4057" },
  { id: 4, title: "World Class Fitness", meta: "Спортивные · 2023 · 5 100 м²", ratio: "square", color: "#3D5A3E" },
  { id: 5, title: "Офис Kaspersky", meta: "Офисы · 2024 · 6 800 м²", ratio: "landscape", color: "#4A3040" },
  { id: 6, title: "Торговый центр", meta: "Ритейл · 2023 · 15 000 м²", ratio: "portrait", color: "#2B4A5A" },
  { id: 7, title: "BMW Showroom", meta: "Ритейл · 2024 · 2 400 м²", ratio: "landscape", color: "#3A3A3A" },
  { id: 8, title: "Жилой комплекс", meta: "Жилая · 2022 · 22 000 м²", ratio: "square", color: "#4A4030" },
  { id: 9, title: "Офис EY", meta: "Офисы · 2023 · 4 600 м²", ratio: "portrait", color: "#2E3748" },
];

// Photo placeholder with aspect ratio indicator
function PhotoPlaceholder({ ratio, color, showBadge = true }) {
  return (
    <div style={{ width: "100%", height: "100%", background: `linear-gradient(145deg, ${color}, ${color}cc)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, position: "relative" }}>
      <div style={{ fontSize: 32, opacity: 0.3 }}>
        {ratio === "landscape" ? "▬" : ratio === "portrait" ? "▮" : "■"}
      </div>
      {showBadge && (
        <div style={{ fontSize: 10, color: "#ffffff60", textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 8px", background: "#00000030", borderRadius: 3 }}>
          {ratio === "landscape" ? "16:9 / 4:3" : ratio === "portrait" ? "3:4 / 9:16" : "1:1"}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 8, overflow: "hidden", cursor: "pointer", position: "relative", ...style }}
    >
      <div style={{ width: "100%", height: "100%", transition: "transform 0.4s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }}>
        <PhotoPlaceholder ratio={project.ratio} color={project.color} />
      </div>
      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered ? `${palette.dark}88` : `linear-gradient(0deg, ${palette.dark}cc 0%, transparent 50%)`,
        transition: "all 0.3s ease",
        display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20,
      }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 4, transition: "transform 0.3s", transform: hovered ? "translateY(-4px)" : "none" }}>
          {project.title}
        </div>
        <div style={{ fontSize: 12, color: "#ffffff99" }}>{project.meta}</div>
        {hovered && (
          <div style={{ fontSize: 13, fontWeight: 600, color: palette.accent, marginTop: 12, opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}>
            Смотреть проект →
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdaptiveGridDemo() {
  const [activeGrid, setActiveGrid] = useState("masonry");
  const [activeBreakpoint, setActiveBreakpoint] = useState("desktop");

  const breakpointWidths = { desktop: "100%", tablet: 768, mobile: 375 };

  const gridOptions = [
    { id: "problem", label: "❌ Текущая проблема" },
    { id: "uniform", label: "Вариант A: Uniform Grid" },
    { id: "masonry", label: "Вариант B: Masonry" },
    { id: "mixed", label: "Вариант C: Mixed Layout" },
    { id: "gallery", label: "Галерея проекта" },
  ];

  return (
    <div style={{ fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif", background: "#0A0A0A", color: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "24px 40px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Гинт-М · Адаптивная сетка проектов</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Решение проблемы разноформатных фото</div>
        </div>
        <div style={{ display: "flex", gap: 4, background: "#111", borderRadius: 6, padding: 3 }}>
          {["desktop", "tablet", "mobile"].map(bp => (
            <button key={bp} onClick={() => setActiveBreakpoint(bp)} style={{
              padding: "6px 14px", borderRadius: 4, border: "none", fontSize: 12, fontWeight: 500, cursor: "pointer",
              background: activeBreakpoint === bp ? "#333" : "transparent",
              color: activeBreakpoint === bp ? "#fff" : "#666",
            }}>
              {bp === "desktop" ? "💻 1440" : bp === "tablet" ? "📱 768" : "📱 375"}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Type Selector */}
      <div style={{ padding: "16px 40px", borderBottom: "1px solid #181818", display: "flex", gap: 4, overflowX: "auto" }}>
        {gridOptions.map(opt => (
          <button key={opt.id} onClick={() => setActiveGrid(opt.id)} style={{
            padding: "8px 18px", borderRadius: 4, border: activeGrid === opt.id ? `1px solid ${palette.accent}` : "1px solid #222",
            background: activeGrid === opt.id ? palette.accent + "15" : "transparent",
            color: activeGrid === opt.id ? palette.accent : "#888",
            fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
          }}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ padding: "32px 40px" }}>
        {/* Viewport simulator */}
        <div style={{
          maxWidth: activeBreakpoint === "desktop" ? "100%" : breakpointWidths[activeBreakpoint],
          margin: "0 auto",
          transition: "max-width 0.4s ease",
        }}>

          {/* PROBLEM: Current state */}
          {activeGrid === "problem" && (
            <div>
              <div style={{ background: "#1a0000", border: "1px solid #441111", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#ff6b6b", marginBottom: 8 }}>⚠️ Текущая проблема на сайте Гинт-М</div>
                <div style={{ fontSize: 13, color: "#cc8888", lineHeight: 1.6 }}>
                  Фото проектов приходят в разных пропорциях (горизонтальные, вертикальные, квадратные), но сетка фиксированная.
                  В результате: вертикальные фото обрезаются сверху/снизу, горизонтальные теряют композицию, нет адаптивности на мобильных.
                </div>
              </div>

              {/* Simulating broken grid */}
              <div style={{ display: "grid", gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                {projects.slice(0, 6).map(p => (
                  <div key={p.id} style={{ borderRadius: 8, overflow: "hidden", height: 220, position: "relative", border: "2px dashed #441111" }}>
                    <PhotoPlaceholder ratio={p.ratio} color={p.color} />
                    {/* Red overlay showing crop issues */}
                    {p.ratio === "portrait" && (
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 30, background: "#ff000040", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 9, color: "#ff6b6b", fontWeight: 600 }}>ОБРЕЗАНО ↑</span>
                      </div>
                    )}
                    {p.ratio === "portrait" && (
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 30, background: "#ff000040", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 9, color: "#ff6b6b", fontWeight: 600 }}>ОБРЕЗАНО ↓</span>
                      </div>
                    )}
                    <div style={{ position: "absolute", bottom: 8, left: 8, right: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{p.title}</div>
                      <div style={{ fontSize: 10, color: "#ffffff80" }}>{p.meta}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: 16, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
                  <strong style={{ color: "#ff6b6b" }}>Проблемы:</strong><br />
                  • Фиксированная высота 220px — вертикальные фото теряют 40–60% содержимого<br />
                  • Нет object-fit: cover / contain — фото растягиваются непропорционально<br />
                  • Одинаковая сетка на всех экранах — на мобильных карточки слишком мелкие<br />
                  • Нет hover-состояний — невозможно понять, что карточка кликабельна
                </div>
              </div>
            </div>
          )}

          {/* SOLUTION A: Uniform Grid with object-fit */}
          {activeGrid === "uniform" && (
            <div>
              <div style={{ background: "#0a1a0a", border: "1px solid #114411", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#6bff6b", marginBottom: 8 }}>✅ Вариант A: Uniform Grid (object-fit: cover)</div>
                <div style={{ fontSize: 13, color: "#88cc88", lineHeight: 1.6 }}>
                  Все карточки одного размера. Фото обрезаются через <code style={{ background: "#1a2a1a", padding: "2px 6px", borderRadius: 3 }}>object-fit: cover</code> до единого aspect ratio 4:3.
                  Самый простой вариант. Работает хорошо, если заказчик готов к тому, что часть фото будет кадрирована автоматически.
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : activeBreakpoint === "tablet" ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: activeBreakpoint === "mobile" ? 12 : 20,
              }}>
                {projects.map(p => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    style={{ aspectRatio: "4/3" }}
                  />
                ))}
              </div>

              <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ padding: 16, background: "#0a1a0a", borderRadius: 8, border: "1px solid #114411" }}>
                  <div style={{ fontSize: 12, color: "#6bff6b", fontWeight: 600, marginBottom: 8 }}>✅ Плюсы</div>
                  <div style={{ fontSize: 12, color: "#88cc88", lineHeight: 1.8 }}>
                    • Аккуратная, ровная сетка<br />
                    • Простая реализация<br />
                    • Легко адаптируется (3→2→1 колонки)<br />
                    • Предсказуемый layout
                  </div>
                </div>
                <div style={{ padding: 16, background: "#1a0a0a", borderRadius: 8, border: "1px solid #441111" }}>
                  <div style={{ fontSize: 12, color: "#ff6b6b", fontWeight: 600, marginBottom: 8 }}>⚠️ Минусы</div>
                  <div style={{ fontSize: 12, color: "#cc8888", lineHeight: 1.8 }}>
                    • Вертикальные фото сильно кадрируются<br />
                    • Теряется разнообразие<br />
                    • Может выглядеть «шаблонно»<br />
                    • Нужна точка фокуса для каждого фото
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SOLUTION B: Masonry */}
          {activeGrid === "masonry" && (
            <div>
              <div style={{ background: "#0a1a0a", border: "1px solid #114411", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#6bff6b", marginBottom: 8 }}>✅ Вариант B: Masonry Grid (рекомендуемый)</div>
                <div style={{ fontSize: 13, color: "#88cc88", lineHeight: 1.6 }}>
                  Каждая карточка сохраняет оригинальные пропорции фото. Колонки выравниваются автоматически.
                  Выглядит как Pinterest / архитектурное портфолио. Каждое фото показывается полностью, без обрезки.
                </div>
              </div>

              {/* Masonry layout using CSS columns */}
              <div style={{
                columnCount: activeBreakpoint === "mobile" ? 1 : activeBreakpoint === "tablet" ? 2 : 3,
                columnGap: activeBreakpoint === "mobile" ? 12 : 20,
              }}>
                {projects.map(p => {
                  const height = p.ratio === "landscape" ? 200 : p.ratio === "portrait" ? 340 : 260;
                  return (
                    <div key={p.id} style={{ breakInside: "avoid", marginBottom: activeBreakpoint === "mobile" ? 12 : 20 }}>
                      <ProjectCard
                        project={p}
                        style={{ height: activeBreakpoint === "mobile" ? height * 0.8 : height }}
                      />
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ padding: 16, background: "#0a1a0a", borderRadius: 8, border: "1px solid #114411" }}>
                  <div style={{ fontSize: 12, color: "#6bff6b", fontWeight: 600, marginBottom: 8 }}>✅ Плюсы</div>
                  <div style={{ fontSize: 12, color: "#88cc88", lineHeight: 1.8 }}>
                    • Фото показываются полностью, без обрезки<br />
                    • Визуально интересный layout<br />
                    • Ощущение «архитектурного журнала»<br />
                    • Работает с любым форматом фото
                  </div>
                </div>
                <div style={{ padding: 16, background: "#1a0a0a", borderRadius: 8, border: "1px solid #441111" }}>
                  <div style={{ fontSize: 12, color: "#ff6b6b", fontWeight: 600, marginBottom: 8 }}>⚠️ Минусы</div>
                  <div style={{ fontSize: 12, color: "#cc8888", lineHeight: 1.8 }}>
                    • Неровные края снизу<br />
                    • Чуть сложнее в реализации<br />
                    • Кнопка «загрузить ещё» может смещаться<br />
                    • Нужна CSS columns или JS-библиотека
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SOLUTION C: Mixed Layout */}
          {activeGrid === "mixed" && (
            <div>
              <div style={{ background: "#0a1a0a", border: "1px solid #114411", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#6bff6b", marginBottom: 8 }}>✅ Вариант C: Mixed Layout (Featured + Grid)</div>
                <div style={{ fontSize: 13, color: "#88cc88", lineHeight: 1.6 }}>
                  Топ-проекты показываются крупно (на всю ширину или 50/50), остальные — в uniform grid.
                  Совмещает преимущества обоих подходов: флагманские проекты раскрываются полностью, а каталог остаётся аккуратным.
                </div>
              </div>

              {/* Featured row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "2fr 1fr",
                gap: activeBreakpoint === "mobile" ? 12 : 20,
                marginBottom: activeBreakpoint === "mobile" ? 12 : 20,
              }}>
                <ProjectCard project={projects[0]} style={{ aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "16/9" }} />
                <ProjectCard project={projects[1]} style={{ aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "3/4" }} />
              </div>

              {/* Regular grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : activeBreakpoint === "tablet" ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: activeBreakpoint === "mobile" ? 12 : 20,
              }}>
                {projects.slice(2, 8).map(p => (
                  <ProjectCard key={p.id} project={p} style={{ aspectRatio: "4/3" }} />
                ))}
              </div>

              {/* Second featured */}
              <div style={{
                display: "grid",
                gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "1fr 2fr",
                gap: activeBreakpoint === "mobile" ? 12 : 20,
                marginTop: activeBreakpoint === "mobile" ? 12 : 20,
              }}>
                <ProjectCard project={projects[8]} style={{ aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "3/4" }} />
                <ProjectCard project={{ ...projects[4], title: "Офис KPMG", meta: "Офисы · 2024 · 9 200 м²" }} style={{ aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "16/9" }} />
              </div>

              <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ padding: 16, background: "#0a1a0a", borderRadius: 8, border: "1px solid #114411" }}>
                  <div style={{ fontSize: 12, color: "#6bff6b", fontWeight: 600, marginBottom: 8 }}>✅ Плюсы</div>
                  <div style={{ fontSize: 12, color: "#88cc88", lineHeight: 1.8 }}>
                    • Флагманские проекты привлекают внимание<br />
                    • Ритмичный, журнальный layout<br />
                    • Контролируемая подача контента<br />
                    • Как у Pridex на главной
                  </div>
                </div>
                <div style={{ padding: 16, background: "#1a0a0a", borderRadius: 8, border: "1px solid #441111" }}>
                  <div style={{ fontSize: 12, color: "#ff6b6b", fontWeight: 600, marginBottom: 8 }}>⚠️ Минусы</div>
                  <div style={{ fontSize: 12, color: "#cc8888", lineHeight: 1.8 }}>
                    • Нужна ручная курация featured-проектов<br />
                    • Сложнее в CMS (разные шаблоны карточек)<br />
                    • Регулярные фото всё ещё кадрируются
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT GALLERY */}
          {activeGrid === "gallery" && (
            <div>
              <div style={{ background: "#0a0a1a", border: "1px solid #111144", borderRadius: 8, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#6b6bff", marginBottom: 8 }}>📷 Галерея внутри страницы проекта</div>
                <div style={{ fontSize: 13, color: "#8888cc", lineHeight: 1.6 }}>
                  Внутри страницы конкретного проекта фото тоже приходят в разных пропорциях.
                  Решение: адаптивная сетка, которая чередует крупные и мелкие фото, сохраняя пропорции.
                </div>
              </div>

              {/* Gallery layout */}
              <div style={{ display: "grid", gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "2fr 1fr", gap: activeBreakpoint === "mobile" ? 8 : 12 }}>
                {/* Large hero photo */}
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "16/9", gridRow: activeBreakpoint === "mobile" ? "auto" : "1/3" }}>
                  <PhotoPlaceholder ratio="landscape" color="#2C3E50" showBadge={false} />
                </div>
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "4/3" }}>
                  <PhotoPlaceholder ratio="square" color="#4A3728" showBadge={false} />
                </div>
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "4/3" }}>
                  <PhotoPlaceholder ratio="landscape" color="#3D5A3E" showBadge={false} />
                </div>
              </div>

              {/* Full width photo */}
              <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "21/9", marginTop: activeBreakpoint === "mobile" ? 8 : 12 }}>
                <PhotoPlaceholder ratio="landscape" color="#2E4057" showBadge={false} />
              </div>

              {/* Three equal photos */}
              <div style={{ display: "grid", gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "repeat(3, 1fr)", gap: activeBreakpoint === "mobile" ? 8 : 12, marginTop: activeBreakpoint === "mobile" ? 8 : 12 }}>
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "4/3" }}>
                  <PhotoPlaceholder ratio="landscape" color="#4A3040" showBadge={false} />
                </div>
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "4/3" }}>
                  <PhotoPlaceholder ratio="portrait" color="#2B4A5A" showBadge={false} />
                </div>
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "4/3" }}>
                  <PhotoPlaceholder ratio="square" color="#3A3A3A" showBadge={false} />
                </div>
              </div>

              {/* Two column with portrait */}
              <div style={{ display: "grid", gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "1fr 2fr", gap: activeBreakpoint === "mobile" ? 8 : 12, marginTop: activeBreakpoint === "mobile" ? 8 : 12 }}>
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "3/4" }}>
                  <PhotoPlaceholder ratio="portrait" color="#4A4030" showBadge={false} />
                </div>
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: activeBreakpoint === "mobile" ? "4/3" : "16/9" }}>
                  <PhotoPlaceholder ratio="landscape" color="#2E3748" showBadge={false} />
                </div>
              </div>

              <div style={{ marginTop: 24, padding: 16, background: "#111", borderRadius: 8, border: "1px solid #222" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Принцип галереи</div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.8 }}>
                  • Первое фото — всегда крупное (hero проекта)<br />
                  • Чередование: крупное + 2 мелких → полная ширина → 3 равных → и так далее<br />
                  • Вертикальные фото размещаются в узкую колонку (1fr), горизонтальные — в широкую (2fr)<br />
                  • На мобильных всё переходит в одну колонку с единым aspect ratio 4:3<br />
                  • object-fit: cover + CMS-поле «точка фокуса» для контроля кадрирования
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
