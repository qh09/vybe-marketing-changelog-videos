import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { VYBE_PRIMARY, VYBE_SECONDARY, VYBE_DARK_BG } from "./colors";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const subtitleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  const badgeProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 12 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [80, 0]);
  const titleOpacity = titleProgress;

  const subtitleY = interpolate(subtitleProgress, [0, 1], [40, 0]);
  const subtitleOpacity = subtitleProgress;

  const badgeScale = badgeProgress;

  // Floating animation for background shapes
  const floatY = interpolate(Math.sin(frame * 0.025), [-1, 1], [-20, 20]);

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
          left: -150,
          bottom: -100,
          transform: `translateY(${floatY}px)`,
          width: 500,
          opacity: 0.3,
        }}
      />
      <Img
        src={staticFile("bg-r-shape.png")}
        style={{
          position: "absolute",
          right: -150,
          top: -100,
          transform: `translateY(${-floatY}px)`,
          width: 500,
          opacity: 0.3,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          padding: "0 100px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            padding: "12px 24px",
            borderRadius: 50,
            background: `${VYBE_PRIMARY}15`,
            border: `1px solid ${VYBE_PRIMARY}30`,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 20,
              fontWeight: 600,
              color: VYBE_SECONDARY,
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            What's New
          </span>
        </div>

        {/* Main title */}
        <h1
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 90,
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            background: `linear-gradient(135deg, #fff 0%, ${VYBE_SECONDARY} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Integrations Update
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 32,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
            maxWidth: 900,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Versatile Enhancements and New Actions
        </p>
      </div>
    </AbsoluteFill>
  );
};
