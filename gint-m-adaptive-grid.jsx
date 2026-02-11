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

const galleryPhotos = [
  { id: 1, ratio: "landscape", color: "#2C3E50", label: "Hero-фото" },
  { id: 2, ratio: "portrait", color: "#4A3728", label: "Вертикальный кадр" },
  { id: 3, ratio: "square", color: "#2E4057", label: "Квадратный кадр" },
  { id: 4, ratio: "landscape", color: "#3D5A3E", label: "Деталь проекта" },
  { id: 5, ratio: "portrait", color: "#4A3040", label: "Зона входа" },
  { id: 6, ratio: "landscape", color: "#2B4A5A", label: "Рабочая зона" },
];

function Frame({ photo, showRatio = true }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 8,
        overflow: "hidden",
        background: `linear-gradient(145deg, ${photo.color}, ${photo.color}cc)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 26, opacity: 0.3, color: "#fff" }}>
        {photo.ratio === "landscape" ? "▬" : photo.ratio === "portrait" ? "▮" : "■"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          fontSize: 11,
          color: "#ffffffcc",
          fontWeight: 600,
        }}
      >
        {photo.label}
      </div>
      {showRatio && (
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            fontSize: 10,
            color: "#ffffffaa",
            padding: "3px 8px",
            background: "#00000035",
            borderRadius: 999,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {photo.ratio}
        </div>
      )}
    </div>
  );
}

export default function AdaptiveGridDemo() {
  const [activeView, setActiveView] = useState("problem");
  const [activeBreakpoint, setActiveBreakpoint] = useState("desktop");

  const breakpoints = {
    desktop: "100%",
    tablet: 768,
    mobile: 375,
  };

  return (
    <div
      style={{
        fontFamily: "'Manrope', 'Golos Text', 'Segoe UI', sans-serif",
        background: "#0A0A0A",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: "24px 40px",
          borderBottom: "1px solid #222",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#666",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            Гинт-М · Адаптивная сетка фотографий внутри проекта
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Галерея внутри страницы проекта
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, background: "#111", borderRadius: 6, padding: 3 }}>
          {["desktop", "tablet", "mobile"].map((bp) => (
            <button
              key={bp}
              onClick={() => setActiveBreakpoint(bp)}
              style={{
                padding: "6px 14px",
                borderRadius: 4,
                border: "none",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                background: activeBreakpoint === bp ? "#333" : "transparent",
                color: activeBreakpoint === bp ? "#fff" : "#666",
              }}
            >
              {bp === "desktop" ? "💻 1440" : bp === "tablet" ? "📱 768" : "📱 375"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 40px", borderBottom: "1px solid #181818", display: "flex", gap: 8 }}>
        {[
          { id: "problem", label: "Проблема" },
          { id: "implementation", label: "Реализация галереи" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            style={{
              padding: "8px 18px",
              borderRadius: 4,
              border: activeView === item.id ? `1px solid ${palette.accent}` : "1px solid #222",
              background: activeView === item.id ? `${palette.accent}15` : "transparent",
              color: activeView === item.id ? palette.accent : "#888",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "32px 40px" }}>
        <div
          style={{
            maxWidth: activeBreakpoint === "desktop" ? "100%" : breakpoints[activeBreakpoint],
            margin: "0 auto",
            transition: "max-width 0.4s ease",
          }}
        >
          {activeView === "problem" && (
            <div>
              <div
                style={{
                  background: "#1a0000",
                  border: "1px solid #441111",
                  borderRadius: 8,
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "#ff7b7b", marginBottom: 8 }}>
                  Фокус проблемы
                </div>
                <div style={{ fontSize: 13, color: "#d39a9a", lineHeight: 1.65 }}>
                  Проблема касается не каталога проектов и не карточек проектов, а галереи внутри страницы отдельного
                  проекта. Сейчас фотографии внутри проекта обрезаются под жёсткий шаблон, из-за чего теряется
                  композиция кадра и ухудшается визуальное качество. Это выглядит некорректно и вызывает недовольство
                  заказчиков.
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "repeat(3, 1fr)",
                  gap: 14,
                }}
              >
                {galleryPhotos.map((photo) => (
                  <div key={photo.id} style={{ height: 220, border: "2px dashed #5a1f1f", borderRadius: 8, overflow: "hidden" }}>
                    <Frame photo={photo} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === "implementation" && (
            <div>
              <div
                style={{
                  background: "#0a1a0a",
                  border: "1px solid #114411",
                  borderRadius: 8,
                  padding: 20,
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "#78e678", marginBottom: 8 }}>
                  Реализация внутри страницы проекта
                </div>
                <div style={{ fontSize: 13, color: "#9cd39c", lineHeight: 1.65 }}>
                  Галерея должна быть адаптивной и работать с разноформатными фотографиями без потери композиции.
                  Ключевая задача — корректное отображение кадров внутри проекта на десктопе и мобильных экранах.
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "2fr 1fr",
                  gap: 12,
                }}
              >
                <div style={{ aspectRatio: "16/9" }}>
                  <Frame photo={galleryPhotos[0]} showRatio={false} />
                </div>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ aspectRatio: "4/3" }}>
                    <Frame photo={galleryPhotos[1]} showRatio={false} />
                  </div>
                  <div style={{ aspectRatio: "4/3" }}>
                    <Frame photo={galleryPhotos[2]} showRatio={false} />
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: activeBreakpoint === "mobile" ? "1fr" : "repeat(3, 1fr)",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                <div style={{ aspectRatio: "4/3" }}>
                  <Frame photo={galleryPhotos[3]} showRatio={false} />
                </div>
                <div style={{ aspectRatio: "3/4" }}>
                  <Frame photo={galleryPhotos[4]} showRatio={false} />
                </div>
                <div style={{ aspectRatio: "4/3" }}>
                  <Frame photo={galleryPhotos[5]} showRatio={false} />
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                  border: "1px solid #223322",
                  borderRadius: 8,
                  background: "#0f170f",
                  padding: 16,
                  color: "#b7d6b7",
                  fontSize: 12,
                  lineHeight: 1.8,
                }}
              >
                • Использовать адаптивные шаблоны раскладки только для галереи внутри проекта.<br />
                • Настроить корректное кадрирование: `object-fit` + фокус-точка в CMS для каждого изображения.<br />
                • На мобильных переводить галерею в одну колонку с читаемым масштабом без случайной обрезки.<br />
                • Не менять логику карточек и сетки каталога проектов в рамках этой задачи.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
