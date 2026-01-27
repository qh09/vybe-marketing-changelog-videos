import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  staticFile,
  Img,
} from "remotion";
import { VYBE_PRIMARY, VYBE_SECONDARY, VYBE_DARK_BG } from "./colors";

// Smooth easeOut curve
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const integrations = [
  { name: "Notion", actions: 5, logo: "notion.png" },
  { name: "Slack", actions: 7, logo: "slack.png" },
  { name: "HubSpot", actions: 4, logo: "hubspot.png" },
  { name: "Google Sheets", actions: 4, logo: "google-sheets.png" },
  { name: "GitHub", actions: 5, logo: "github.png" },
  { name: "Gmail", actions: 1, logo: "gmail.png" },
  { name: "Google Calendar", actions: 1, logo: "google-calendar.png" },
  { name: "Attio", actions: 1, logo: "attio.png" },
];

export const IntegrationsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerRaw = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerProgress = easeOut(headerRaw);

  const totalActions = integrations.reduce((acc, i) => acc + i.actions, 0);

  // Counter animation
  const countProgress = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayCount = Math.round(countProgress * totalActions);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: VYBE_DARK_BG,
        padding: "60px 80px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerProgress,
          transform: `translateY(${interpolate(headerProgress, [0, 1], [30, 0])}px)`,
          marginBottom: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            Integration Updates
          </span>
        </div>

        {/* Counter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "rgba(255, 255, 255, 0.03)",
            padding: "12px 24px",
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 48,
              fontWeight: 800,
              background: `linear-gradient(135deg, ${VYBE_PRIMARY} 0%, ${VYBE_SECONDARY} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {displayCount}
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              new actions
            </span>
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              across {integrations.length} integrations
            </span>
          </div>
        </div>
      </div>

      {/* Integration grid - 4x2 for 8 integrations */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {integrations.map((integration, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const staggerDelay = 12 + row * 6 + col * 3;

          const cardRaw = interpolate(frame - staggerDelay, [0, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardProgress = easeOut(cardRaw);
          const cardY = interpolate(cardProgress, [0, 1], [25, 0]);

          return (
            <div
              key={integration.name}
              style={{
                opacity: cardProgress,
                transform: `translateY(${cardY}px)`,
                background: "linear-gradient(145deg, rgba(25, 30, 50, 0.9) 0%, rgba(15, 18, 35, 0.95) 100%)",
                borderRadius: 24,
                padding: "36px 28px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Logo container - clean white background */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Img
                  src={staticFile(`logos/${integration.logo}`)}
                  style={{
                    width: 44,
                    height: 44,
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Name */}
              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#fff",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {integration.name}
              </span>

              {/* Actions badge - unified brand color */}
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${VYBE_PRIMARY}20 0%, ${VYBE_SECONDARY}15 100%)`,
                  border: `1px solid ${VYBE_PRIMARY}40`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: VYBE_SECONDARY,
                  }}
                >
                  +{integration.actions} {integration.actions === 1 ? "action" : "actions"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
