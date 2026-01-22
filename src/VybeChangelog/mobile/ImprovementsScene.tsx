import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { VYBE_PRIMARY, VYBE_SECONDARY, VYBE_DARK_BG } from "../colors";

const improvements = [
  {
    title: "Refined Build Errors",
    description: "Simplified error messages for less intrusive builds.",
    icon: "🔔",
  },
  {
    title: "Test Run Button",
    description: "Quickly validate your workflow setup.",
    icon: "▶️",
  },
  {
    title: "Integration Icon Bar",
    description: "Easily @mention connected apps.",
    icon: "💬",
  },
];

export const ImprovementsSceneMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: VYBE_DARK_BG,
        padding: 50,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          opacity: headerProgress,
          transform: `translateY(${interpolate(headerProgress, [0, 1], [30, 0])}px)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: VYBE_PRIMARY,
              boxShadow: `0 0 20px ${VYBE_PRIMARY}`,
            }}
          />
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: VYBE_SECONDARY,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Improvements
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {improvements.map((item, index) => {
          const itemProgress = spring({
            frame,
            fps,
            delay: 10 + index * 12,
            config: { damping: 15, stiffness: 80 },
          });

          const itemY = interpolate(itemProgress, [0, 1], [60, 0]);
          const itemOpacity = itemProgress;

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "28px 24px",
                background: "rgba(15, 18, 35, 0.6)",
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: `${VYBE_PRIMARY}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 26 }}>{item.icon}</span>
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#fff",
                    margin: 0,
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.5)",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${VYBE_SECONDARY} 0%, ${VYBE_PRIMARY} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${spring({ frame, fps, delay: 20 + index * 12, config: { damping: 12 } })})`,
                }}
              >
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>✓</span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
