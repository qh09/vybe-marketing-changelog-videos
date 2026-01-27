import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { VYBE_PRIMARY, VYBE_SECONDARY, VYBE_DARK_BG } from "./colors";

// Smooth easeOut curve
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth fade-in animations
  const logoRaw = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoProgress = easeOut(logoRaw);

  const ctaRaw = interpolate(frame - 12, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaProgress = easeOut(ctaRaw);

  const buttonRaw = interpolate(frame - 22, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buttonProgress = easeOut(buttonRaw);

  // Subtle pulse for logo glow
  const pulseIntensity = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.4, 0.6]
  );

  // Floating animation for background shapes
  const floatY = interpolate(Math.sin(frame * 0.02), [-1, 1], [-15, 15]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: VYBE_DARK_BG,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background shapes */}
      <Img
        src={staticFile("bg-l-shape.png")}
        style={{
          position: "absolute",
          left: -100,
          top: "50%",
          transform: `translateY(calc(-50% + ${floatY}px))`,
          width: 550,
          opacity: 0.35,
        }}
      />
      <Img
        src={staticFile("bg-r-shape.png")}
        style={{
          position: "absolute",
          right: -100,
          top: "50%",
          transform: `translateY(calc(-50% + ${-floatY}px))`,
          width: 550,
          opacity: 0.35,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* Logo - fade in and slide up, no scale */}
        <div
          style={{
            opacity: logoProgress,
            transform: `translateY(${interpolate(logoProgress, [0, 1], [20, 0])}px)`,
            filter: `drop-shadow(0 0 60px ${VYBE_PRIMARY}${Math.round(pulseIntensity * 80).toString(16).padStart(2, "0")})`,
          }}
        >
          <Img
            src={staticFile("vybe-full-logo-white.svg")}
            style={{
              width: 320,
            }}
          />
        </div>

        {/* CTA text */}
        <div
          style={{
            opacity: ctaProgress,
            transform: `translateY(${interpolate(ctaProgress, [0, 1], [30, 0])}px)`,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 56,
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              marginBottom: 16,
            }}
          >
            Start building with Vybe
          </h2>
          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 24,
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.5)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Secure internal apps. Built by AI in seconds. Powered by your data.
            <br />
            <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
              Loved by engineers and business teams.
            </span>
          </p>
        </div>

        {/* CTA Button - fade in and slide up, no scale */}
        <div
          style={{
            opacity: buttonProgress,
            transform: `translateY(${interpolate(buttonProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              padding: "24px 64px",
              borderRadius: 16,
              background: `linear-gradient(135deg, ${VYBE_PRIMARY} 0%, ${VYBE_SECONDARY} 100%)`,
              boxShadow: `0 0 50px ${VYBE_PRIMARY}60`,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              vybe.build
            </span>
            <span style={{ fontSize: 28, color: "#fff" }}>→</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
