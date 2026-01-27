import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { VYBE_PRIMARY, VYBE_DARK_BG } from "./colors";

// Smooth easeOut curve
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth fade-in animations
  const logoRaw = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoProgress = easeOut(logoRaw);

  const bgRaw = interpolate(frame - 5, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgProgress = easeOut(bgRaw);

  // Floating animation for background shapes
  const floatY = interpolate(
    Math.sin(frame * 0.02),
    [-1, 1],
    [-15, 15]
  );

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
          width: 600,
          opacity: bgProgress * 0.4,
        }}
      />
      <Img
        src={staticFile("bg-r-shape.png")}
        style={{
          position: "absolute",
          right: -100,
          top: "50%",
          transform: `translateY(calc(-50% + ${-floatY}px))`,
          width: 600,
          opacity: bgProgress * 0.4,
        }}
      />

      {/* Logo container - fade in and slide up, no scale */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          opacity: logoProgress,
          transform: `translateY(${interpolate(logoProgress, [0, 1], [25, 0])}px)`,
        }}
      >
        <Img
          src={staticFile("vybe-full-logo-white.svg")}
          style={{
            width: 400,
            filter: `drop-shadow(0 0 60px ${VYBE_PRIMARY}60)`,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Changelog v1.1.1
          </span>
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            January 27, 2026
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
