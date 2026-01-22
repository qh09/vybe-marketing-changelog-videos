import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  Img,
} from "remotion";
import { VYBE_PRIMARY, VYBE_SECONDARY, VYBE_DARK_BG } from "../colors";

const integrations = [
  { name: "Attio", actions: 4, logo: "attio.png" },
  { name: "Stripe", actions: 1, logo: "stripe.png" },
  { name: "Gemini", actions: 1, logo: "google-gemini.png" },
  { name: "Amplitude", actions: 2, logo: "amplitude.png" },
  { name: "Supabase", actions: 1, logo: "supabase.png" },
  { name: "HubSpot", actions: 3, logo: "hubspot.png" },
  { name: "Salesforce", actions: 1, logo: "salesforce.png" },
  { name: "Linear", actions: 1, logo: "linear.png" },
  { name: "Intercom", actions: 2, logo: "intercom.png" },
  { name: "Resend", actions: 1, logo: "resend.png" },
  { name: "Lemlist", actions: 3, logo: "lemlist.png" },
  { name: "FireCrawl", actions: 1, logo: "firecrawl.png" },
];

export const IntegrationsSceneMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const totalActions = integrations.reduce((acc, i) => acc + i.actions, 0) + 3;

  const countProgress = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayCount = Math.round(countProgress * totalActions);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: VYBE_DARK_BG,
        padding: "40px 36px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          opacity: headerProgress,
          transform: `translateY(${interpolate(headerProgress, [0, 1], [30, 0])}px)`,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: VYBE_PRIMARY,
                boxShadow: `0 0 16px ${VYBE_PRIMARY}`,
              }}
            />
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: VYBE_SECONDARY,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Integrations
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255, 255, 255, 0.03)",
              padding: "8px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 32,
                fontWeight: 800,
                background: `linear-gradient(135deg, ${VYBE_PRIMARY} 0%, ${VYBE_SECONDARY} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {displayCount}
            </span>
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              new
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {integrations.map((integration, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const staggerDelay = 15 + row * 4 + col * 3;

          const cardProgress = spring({
            frame,
            fps,
            delay: staggerDelay,
            config: { damping: 12 },
          });

          return (
            <div
              key={integration.name}
              style={{
                opacity: cardProgress,
                transform: `scale(${interpolate(cardProgress, [0, 1], [0.8, 1])})`,
                background: "linear-gradient(145deg, rgba(25, 30, 50, 0.9) 0%, rgba(15, 18, 35, 0.95) 100%)",
                borderRadius: 14,
                padding: 14,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
              >
                <Img
                  src={staticFile(`logos/${integration.logo}`)}
                  style={{
                    width: 26,
                    height: 26,
                    objectFit: "contain",
                  }}
                />
              </div>

              <span
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {integration.name}
              </span>

              <div
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  background: `linear-gradient(135deg, ${VYBE_PRIMARY}20 0%, ${VYBE_SECONDARY}15 100%)`,
                  border: `1px solid ${VYBE_PRIMARY}40`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    color: VYBE_SECONDARY,
                  }}
                >
                  +{integration.actions}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
