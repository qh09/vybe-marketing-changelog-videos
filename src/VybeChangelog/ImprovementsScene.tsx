import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { VYBE_PRIMARY, VYBE_SECONDARY, VYBE_DARK_BG } from "./colors";

// Smooth easeOut curve
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const improvements = [
  {
    title: "Refined Build Error Notifications",
    description: "Simplified error messages for a less intrusive experience during builds.",
    icon: "🔔",
  },
  {
    title: "Test Run Button for Workflows",
    description: "Quickly perform ad hoc test runs to validate your workflow setup.",
    icon: "▶️",
  },
  {
    title: "Integration Icon Bar",
    description: "Easily @mention connected apps with the new chat input integration bar.",
    icon: "💬",
  },
];

export const ImprovementsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerRaw = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerProgress = easeOut(headerRaw);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: VYBE_DARK_BG,
        padding: 80,
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        style={{
          opacity: headerProgress,
          transform: `translateY(${interpolate(headerProgress, [0, 1], [20, 0])}px)`,
          marginBottom: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: VYBE_PRIMARY,
              boxShadow: `0 0 20px ${VYBE_PRIMARY}`,
            }}
          />
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 24,
              fontWeight: 600,
              color: VYBE_SECONDARY,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Improvements & Fixes
          </span>
        </div>
      </div>

      {/* Improvements list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        {improvements.map((item, index) => {
          const delay = 10 + index * 10;
          const itemRaw = interpolate(frame - delay, [0, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const itemProgress = easeOut(itemRaw);

          const itemX = interpolate(itemProgress, [0, 1], [-40, 0]);
          const itemOpacity = itemProgress;

          // Checkmark appears slightly after the item
          const checkDelay = delay + 8;
          const checkRaw = interpolate(frame - checkDelay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const checkProgress = easeOut(checkRaw);

          return (
            <div
              key={index}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "36px 40px",
                background: "rgba(15, 18, 35, 0.6)",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 16,
                  background: `${VYBE_PRIMARY}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 32 }}>{item.icon}</span>
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 28,
                    fontWeight: 600,
                    color: "#fff",
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 20,
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.5)",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>

              {/* Check mark - fade in, no scale */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${VYBE_SECONDARY} 0%, ${VYBE_PRIMARY} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: checkProgress,
                }}
              >
                <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>✓</span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
