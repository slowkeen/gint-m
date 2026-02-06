import { useState } from "react";

const palettes = {
  warmIndustrial: {
    name: "Warm Industrial",
    subtitle: "Рекомендуемый",
    dark: "#1C1C1E",
    light: "#FAF9F7",
    secondary: "#F0EEEA",
    text: "#1A1A1A",
    textMuted: "#6B7280",
    accent: "#C05A3C",
    accentHover: "#A04830",
    border: "#E5E2DD",
  },
  coolPrecision: {
    name: "Cool Precision",
    subtitle: "Корпоративный",
    dark: "#0F1117",
    light: "#FFFFFF",
    secondary: "#F4F5F7",
    text: "#1A1A1A",
    textMuted: "#6B7280",
    accent: "#1E3A8A",
    accentHover: "#172E6E",
    border: "#E5E7EB",
  },
  confidentNeutral: {
    name: "Confident Neutral",
    subtitle: "Премиальный",
    dark: "#1A1F1C",
    light: "#FAFAF5",
    secondary: "#F0F0E8",
    text: "#1A1A1A",
    textMuted: "#6B7280",
    accent: "#B8953E",
    accentHover: "#9A7A30",
    border: "#E2E0D8",
  },
};

export default function GintMDesignSystem() {
  const [activePalette, setActivePalette] = useState("warmIndustrial");
  const [activeSection, setActiveSection] = useState("hero");
  const p = palettes[activePalette];

  return (
    <div style={{ fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif", background: "#0A0A0A", color: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "32px 40px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 14, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Design System Moodboard</div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>ГИНТ-М</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {Object.entries(palettes).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActivePalette(key)}
              style={{
                padding: "8px 16px",
                borderRadius: 4,
                border: activePalette === key ? `2px solid ${val.accent}` : "1px solid #333",
                background: activePalette === key ? val.accent + "20" : "transparent",
                color: activePalette === key ? val.accent : "#888",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {val.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "40px" }}>
        {/* Palette Display */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Палитра: {p.name} <span style={{ color: p.accent }}>• {p.subtitle}</span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { color: p.dark, label: "Dark BG", hex: p.dark },
              { color: p.light, label: "Light BG", hex: p.light },
              { color: p.secondary, label: "Secondary", hex: p.secondary },
              { color: p.text, label: "Text", hex: p.text },
              { color: p.textMuted, label: "Muted", hex: p.textMuted },
              { color: p.accent, label: "Accent", hex: p.accent },
              { color: p.accentHover, label: "Hover", hex: p.accentHover },
              { color: p.border, label: "Border", hex: p.border },
            ].map((c, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 8,
                    background: c.color,
                    border: "1px solid #333",
                    marginBottom: 6,
                  }}
                />
                <div style={{ fontSize: 11, color: "#888" }}>{c.label}</div>
                <div style={{ fontSize: 10, color: "#555", fontFamily: "monospace" }}>{c.hex}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, borderBottom: "1px solid #222", paddingBottom: 0 }}>
          {[
            { id: "hero", label: "Hero-секция" },
            { id: "cards", label: "Карточки" },
            { id: "project", label: "Страница проекта" },
            { id: "typography", label: "Типографика" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                padding: "10px 20px",
                border: "none",
                borderBottom: activeSection === tab.id ? `2px solid ${p.accent}` : "2px solid transparent",
                background: "transparent",
                color: activeSection === tab.id ? "#fff" : "#666",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hero Section Preview */}
        {activeSection === "hero" && (
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
            <div
              style={{
                background: `linear-gradient(135deg, ${p.dark} 0%, ${p.dark}ee 100%)`,
                padding: "80px 60px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle grid overlay */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${p.border} 1px, transparent 1px), linear-gradient(90deg, ${p.border} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 13, color: p.textMuted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
                  Строительство и проектирование
                </div>
                <div style={{ fontSize: 56, fontWeight: 700, color: p.light, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-0.03em", maxWidth: 700 }}>
                  Генеральный подрядчик полного цикла
                </div>
                <div style={{ fontSize: 18, color: p.textMuted, marginBottom: 40, maxWidth: 500, lineHeight: 1.6 }}>
                  Проектирование, строительство и инженерное оснащение зданий с 2001 года
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: 48, marginBottom: 40 }}>
                  {[
                    { num: "20+", label: "лет на рынке" },
                    { num: "500+", label: "проектов" },
                    { num: "1M+", label: "кв.м построено" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 40, fontWeight: 700, color: p.accent, letterSpacing: "-0.02em" }}>{s.num}</div>
                      <div style={{ fontSize: 14, color: p.textMuted, marginTop: 4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 16 }}>
                  <button
                    style={{
                      padding: "14px 32px",
                      background: p.accent,
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Обсудить проект
                  </button>
                  <button
                    style={{
                      padding: "14px 32px",
                      background: "transparent",
                      color: p.light,
                      border: `1.5px solid ${p.border}40`,
                      borderRadius: 4,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Портфолио →
                  </button>
                </div>
              </div>
            </div>

            {/* Clients bar */}
            <div style={{ background: p.secondary, padding: "24px 60px", display: "flex", alignItems: "center", gap: 40 }}>
              <div style={{ fontSize: 12, color: p.textMuted, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.1em" }}>Нам доверяют:</div>
              {["Microsoft", "SAP", "Kaspersky", "BMW", "EY", "KPMG"].map((name, i) => (
                <div key={i} style={{ fontSize: 14, fontWeight: 600, color: p.textMuted, opacity: 0.5 }}>{name}</div>
              ))}
            </div>
          </div>
        )}

        {/* Cards Preview */}
        {activeSection === "cards" && (
          <div>
            {/* Service Cards */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 13, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Карточки услуг</div>
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  { icon: "📐", title: "Проектирование", desc: "Концепция, рабочий проект, авторский надзор" },
                  { icon: "🏗", title: "Строительство", desc: "Полный цикл строительных и инженерных работ" },
                  { icon: "⚙️", title: "Эксплуатация", desc: "Обслуживание инженерных систем и оборудования" },
                ].map((card, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: p.light,
                      borderRadius: 8,
                      padding: 32,
                      border: `1px solid ${p.border}`,
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 16 }}>{card.icon}</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: p.text, marginBottom: 8 }}>{card.title}</div>
                    <div style={{ fontSize: 15, color: p.textMuted, lineHeight: 1.5, marginBottom: 20 }}>{card.desc}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: p.accent, cursor: "pointer" }}>Подробнее →</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Cards */}
            <div>
              <div style={{ fontSize: 13, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Карточки проектов</div>
              <div style={{ display: "flex", gap: 20 }}>
                {[
                  { title: "Штаб-квартира Microsoft", meta: "Офисы · 2023 · 12 000 м²", color: "#2D3748" },
                  { title: "Клиника Кит Мед", meta: "Медицинские · 2024 · 3 200 м²", color: "#3D2E2E" },
                  { title: "Спортивный комплекс", meta: "Спортивные · 2022 · 8 500 м²", color: "#2E3D2E" },
                ].map((card, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: 8, overflow: "hidden", cursor: "pointer" }}>
                    <div
                      style={{
                        height: 200,
                        background: `linear-gradient(145deg, ${card.color}, ${card.color}bb)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <div style={{ fontSize: 13, color: "#ffffff60", textTransform: "uppercase", letterSpacing: "0.15em" }}>Фото проекта</div>
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `${p.dark}00`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s",
                        }}
                      />
                    </div>
                    <div style={{ padding: "16px 0" }}>
                      <div style={{ fontSize: 17, fontWeight: 600, color: p.light, marginBottom: 4 }}>{card.title}</div>
                      <div style={{ fontSize: 13, color: "#888" }}>{card.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project Page Preview */}
        {activeSection === "project" && (
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
            {/* Project Hero */}
            <div
              style={{
                background: `linear-gradient(180deg, ${p.dark} 0%, #2D3748 100%)`,
                padding: "80px 60px 60px",
              }}
            >
              <div style={{ fontSize: 12, color: p.accent, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Офисные пространства</div>
              <div style={{ fontSize: 48, fontWeight: 700, color: p.light, letterSpacing: "-0.02em", marginBottom: 8 }}>Штаб-квартира Microsoft</div>
              <div style={{ fontSize: 16, color: p.textMuted }}>Москва, 2023</div>
            </div>

            {/* Meta + Description */}
            <div style={{ background: p.light, padding: "40px 60px", display: "flex", gap: 60 }}>
              {/* Sidebar */}
              <div style={{ minWidth: 200, borderRight: `1px solid ${p.border}`, paddingRight: 40 }}>
                {[
                  { label: "Площадь", value: "12 000 м²" },
                  { label: "Срок реализации", value: "14 месяцев" },
                  { label: "Вид работ", value: "Fit-out, MEP" },
                  { label: "Адрес", value: "Москва, Крылатское" },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: p.text }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, color: p.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Задача</div>
                  <div style={{ fontSize: 16, color: p.text, lineHeight: 1.7 }}>
                    Создать современное рабочее пространство штаб-квартиры, соответствующее глобальным стандартам Microsoft, с учётом гибридного формата работы.
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, color: p.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Решение</div>
                  <div style={{ fontSize: 16, color: p.text, lineHeight: 1.7 }}>
                    Полный цикл работ: архитектурное проектирование, строительство, инженерные системы (HVAC, электрика, слаботочные системы), отделка и меблировка.
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: p.accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Результат</div>
                  <div style={{ fontSize: 16, color: p.text, lineHeight: 1.7 }}>
                    Сдача объекта в срок. Офис получил награду Best Office Awards 2024.
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: p.secondary, padding: "32px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: p.text }}>Хотите обсудить похожий проект?</div>
              <button style={{ padding: "12px 28px", background: p.accent, color: "#fff", border: "none", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Связаться с нами
              </button>
            </div>
          </div>
        )}

        {/* Typography Preview */}
        {activeSection === "typography" && (
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
            <div style={{ background: p.light, padding: "48px 60px" }}>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Иерархия заголовков — Outfit</div>
                <div style={{ fontSize: 72, fontWeight: 700, color: p.text, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>Hero H1 — 72px</div>
                <div style={{ fontSize: 48, fontWeight: 600, color: p.text, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16 }}>Секция H2 — 48px</div>
                <div style={{ fontSize: 28, fontWeight: 600, color: p.text, lineHeight: 1.3, marginBottom: 16 }}>Подзаголовок H3 — 28px</div>
                <div style={{ fontSize: 18, color: p.text, lineHeight: 1.6, maxWidth: 600 }}>
                  Body text — 18px. Гинт-М — генеральный подрядчик, работающий как генподрядчик и генпроектировщик, предоставляя полный комплекс услуг в области строительства.
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${p.border}`, paddingTop: 32, marginBottom: 32 }}>
                <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Кнопки</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <button style={{ padding: "14px 32px", background: p.accent, color: "#fff", border: "none", borderRadius: 4, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    Primary CTA
                  </button>
                  <button style={{ padding: "14px 32px", background: "transparent", color: p.text, border: `1.5px solid ${p.accent}`, borderRadius: 4, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    Secondary
                  </button>
                  <span style={{ fontSize: 15, fontWeight: 600, color: p.accent, cursor: "pointer" }}>Ghost link →</span>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${p.border}`, paddingTop: 32 }}>
                <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>Акцентный цвет в контексте</div>
                <div style={{ display: "flex", gap: 32 }}>
                  <div style={{ width: 4, background: p.accent, borderRadius: 2 }} />
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: p.text, marginBottom: 8 }}>ISO 9001:2015 · ISO 45001:2018</div>
                    <div style={{ fontSize: 16, color: p.textMuted, lineHeight: 1.6 }}>
                      Международные сертификаты качества и безопасности труда. Контроль на каждом этапе: от проектирования до гарантийного обслуживания.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
