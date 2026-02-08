import React, { useState } from "react";

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
    noteLabel: "Почему терракот",
    note: "Тёплый, ассоциируется со строительством и материалами (кирпич, глина), выделяется на фоне нейтральных референсов и не выглядит «корпоративно‑холодным».",
    rows: [
      { role: "Тёмный фон", hex: "#1C1C1E", usage: "Первый экран, футер, акцентные секции" },
      { role: "Светлый фон", hex: "#FAF9F7", usage: "Основной контент" },
      { role: "Вторичный фон", hex: "#F0EEEA", usage: "Чередование секций, карточки" },
      { role: "Основной текст", hex: "#1A1A1A", usage: "Заголовки, основной текст" },
      { role: "Вторичный текст", hex: "#6B7280", usage: "Подписи, мета-информация" },
      { role: "Акцент", hex: "#C05A3C", usage: "Кнопки, фокус, выделения" },
      { role: "Акцент при наведении", hex: "#A04830", usage: "Состояние нажатия" },
      { role: "Линии/разделители", hex: "#E5E2DD", usage: "Бордеры, разделители" },
    ],
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
    noteLabel: "Когда выбрать",
    note: "Если заказчик хочет максимально приблизиться к эстетике Pridex (тёмный + нейтральный) и более «корпоративному» характеру.",
    rows: [
      { role: "Тёмный фон", hex: "#0F1117", usage: "Первый экран, футер" },
      { role: "Светлый фон", hex: "#FFFFFF", usage: "Основной контент" },
      { role: "Вторичный фон", hex: "#F4F5F7", usage: "Чередование секций" },
      { role: "Акцент", hex: "#1E3A8A", usage: "Кнопки, активные состояния" },
      { role: "Акцент при наведении", hex: "#172E6E", usage: "Состояние нажатия" },
      { role: "Линии/разделители", hex: "#E5E7EB", usage: "Бордеры, разделители" },
    ],
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
    noteLabel: "Когда выбрать",
    note: "Если хотят максимально премиальное ощущение «архитектурного бюро» и позиционирование в верхнем сегменте.",
    rows: [
      { role: "Тёмный фон", hex: "#1A1F1C", usage: "Первый экран, футер" },
      { role: "Светлый фон", hex: "#FAFAF5", usage: "Основной контент" },
      { role: "Вторичный фон", hex: "#F0F0E8", usage: "Чередование секций, карточки" },
      { role: "Основной текст", hex: "#1A1A1A", usage: "Заголовки, основной текст" },
      { role: "Вторичный текст", hex: "#6B7280", usage: "Подписи, мета-информация" },
      { role: "Акцент", hex: "#B8953E", usage: "Кнопки, выделения" },
      { role: "Акцент при наведении", hex: "#9A7A30", usage: "Состояние нажатия" },
      { role: "Линии/разделители", hex: "#E2E0D8", usage: "Бордеры, разделители" },
    ],
  },
};

export default function GintMDesignSystem() {
  const [activePalette, setActivePalette] = useState("warmIndustrial");
  const [activeSection, setActiveSection] = useState("hero");
  const p = palettes[activePalette];

  return (
    <div style={{ fontFamily: "'Manrope', 'Golos Text', 'Segoe UI', sans-serif", background: "#0A0A0A", color: "#fff", minHeight: "100vh" }}>
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
          <div style={{ marginTop: 24, padding: 20, borderRadius: 12, border: "1px solid #222", background: "#0f0f0f" }}>
            <div style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
              Цветовая палитра — описание
            </div>
            <div style={{ fontSize: 14, color: "#bbb", lineHeight: 1.6, marginBottom: 16 }}>
              Существующие фирменные цвета не вписываются в современную минималистичную эстетику. Палитра строится с нуля с ориентиром на
              сдержанный, премиальный визуал.
            </div>
            <div style={{ fontSize: 13, color: "#ddd", marginBottom: 10 }}>
              <strong style={{ color: p.accent }}>{p.noteLabel}:</strong> {p.note}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.7fr 1.4fr", gap: 10, fontSize: 12, color: "#999" }}>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Роль</div>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>HEX</div>
              <div style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Применение</div>
              {p.rows.map((row, idx) => (
                <React.Fragment key={idx}>
                  <div style={{ color: "#ddd", padding: "6px 0", borderTop: "1px solid #1f1f1f" }}>{row.role}</div>
                  <div style={{ fontFamily: "monospace", padding: "6px 0", borderTop: "1px solid #1f1f1f" }}>{row.hex}</div>
                  <div style={{ color: "#bbb", padding: "6px 0", borderTop: "1px solid #1f1f1f" }}>{row.usage}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, borderBottom: "1px solid #222", paddingBottom: 0 }}>
          {[
            { id: "hero", label: "Hero-секция" },
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

        {/* Typography Preview */}
        {activeSection === "typography" && (
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
            <div style={{ background: p.light, padding: "48px 60px" }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Сравнение шрифтов (одинаковый текст)</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                  <div style={{ border: `1px solid ${p.border}`, borderRadius: 10, padding: 22 }}>
                    <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Сейчас — PT Sans</div>
                    <div style={{ fontFamily: "'PT Sans', 'Segoe UI', sans-serif" }}>
                      <div style={{ fontSize: 30, fontWeight: 700, color: p.text, letterSpacing: "0.01em", marginBottom: 8 }}>
                        ГЕНПОДРЯДЧИК ПОЛНОГО ЦИКЛА 2001–2026
                      </div>
                      <div style={{ fontSize: 14, color: p.textMuted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
                        Проектирование · Строительство · Эксплуатация
                      </div>
                      <div style={{ fontSize: 16, color: p.text, lineHeight: 1.7 }}>
                        Съешь же ещё этих мягких французских булок, да выпей чаю. 0123456789 · ₽ € $ %
                      </div>
                    </div>
                  </div>
                  <div style={{ border: `1px solid ${p.border}`, borderRadius: 10, padding: 22 }}>
                    <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Предлагаем — Manrope + Golos Text</div>
                    <div style={{ fontFamily: "'Manrope', 'Golos Text', 'Segoe UI', sans-serif" }}>
                      <div style={{ fontSize: 30, fontWeight: 700, color: p.text, letterSpacing: "-0.02em", marginBottom: 8 }}>
                        ГЕНПОДРЯДЧИК ПОЛНОГО ЦИКЛА 2001–2026
                      </div>
                      <div style={{ fontSize: 14, color: p.textMuted, letterSpacing: "0.26em", textTransform: "uppercase", marginBottom: 10 }}>
                        Проектирование · Строительство · Эксплуатация
                      </div>
                      <div style={{ fontSize: 16, color: p.text, lineHeight: 1.7, fontFamily: "'Golos Text', 'Segoe UI', sans-serif" }}>
                        Съешь же ещё этих мягких французских булок, да выпей чаю. 0123456789 · ₽ € $ %
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 28, fontSize: 14, color: p.text, lineHeight: 1.6 }}>
                <strong>Почему меняем:</strong> текущий шрифт воспринимается как базовый и «без характера», а предложенная пара даёт более современный и уверенный образ без потери читабельности.
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Предлагаемая пара шрифтов</div>
                <div style={{ fontSize: 14, color: p.text, lineHeight: 1.6 }}>
                  <strong>Заголовки: Manrope</strong> — современный, геометричный, хорошо держит строгие заголовки.
                </div>
                <div style={{ fontSize: 14, color: p.text, lineHeight: 1.6, marginTop: 8 }}>
                  <strong>Текст: Golos Text</strong> — очень читабельный, «деловой» характер, отлично работает в длинных абзацах.
                </div>
                <div style={{ fontSize: 13, color: p.textMuted, marginTop: 10 }}>
                  Почему не Inter/Roboto: слишком распространены, не создают запоминающегося визуального впечатления.
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 12, color: p.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Премиальные варианты (лицензия)</div>
                <div style={{ fontSize: 14, color: p.text, lineHeight: 1.6 }}>
                  TT Norms Pro, TT Hoves Pro, Cera Pro, Gotham Pro, Proxima Nova, TT Commons Pro.
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
