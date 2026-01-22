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
  { name: "Attio", actions: 4, logo: "attio.png" },
  { name: "Stripe", actions: 1, logo: "stripe.png" },
  { name: "Google Gemini", actions: 1, logo: "google-gemini.png" },
  { name: "Amplitude", actions: 2, logo: "amplitude.png" },
  { name: "Supabase", actions: 1, logo: "supabase.png" },
  { name: "HubSpot", actions: 3, logo: "hubspot.png" },
  { name: "Salesforce", actions: 1, logo: "salesforce.png" },
  { name: "Linear", actions: 1, logo: "linear.png" },
  { name: "Intercom", actions: 2, logo: "intercom.png" },
  { name: "Resend", actions: 1, logo: "resend.png" },
  { name: "Lemlist", actions: 3, logo: "lemlist.png" },
  { name: "FireCrawl", actions: 1, logo: "firecrawl.png" },
  { name: "Phantombuster", actions: 1, logo: "phantombuster.png" },
  { name: "Google Calendar", actions: 1, logo: "google-calendar.png" },
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
          marginBottom: 40,
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

      {/* Integration grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 16,
        }}
      >
        {integrations.map((integration, index) => {
          const row = Math.floor(index / 7);
          const col = index % 7;
          const staggerDelay = 12 + row * 4 + col * 2;

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
                borderRadius: 20,
                padding: "28px 20px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Logo container - clean white background */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
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
                    width: 36,
                    height: 36,
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Name */}
              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  textAlign: "center",
                  lineHeight: 1.2,
                  minHeight: 34,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {integration.name}
              </span>

              {/* Actions badge - unified brand color */}
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${VYBE_PRIMARY}20 0%, ${VYBE_SECONDARY}15 100%)`,
                  border: `1px solid ${VYBE_PRIMARY}40`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 12,
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
