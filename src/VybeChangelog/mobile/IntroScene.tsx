import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { VYBE_PRIMARY, VYBE_DARK_BG } from "../colors";

// Smooth easeOut curve
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const IntroSceneMobile: React.FC = () => {
  const frame = useCurrentFrame();

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
      <Img
        src={staticFile("bg-l-shape.png")}
        style={{
          position: "absolute",
          left: -150,
          top: "30%",
          transform: `translateY(${floatY}px)`,
          width: 400,
          opacity: bgProgress * 0.4,
        }}
      />
      <Img
        src={staticFile("bg-r-shape.png")}
        style={{
          position: "absolute",
          right: -150,
          bottom: "30%",
          transform: `translateY(${-floatY}px)`,
          width: 400,
          opacity: bgProgress * 0.4,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: logoProgress,
          transform: `translateY(${interpolate(logoProgress, [0, 1], [25, 0])}px)`,
        }}
      >
        <Img
          src={staticFile("vybe-full-logo-white.svg")}
          style={{
            width: 280,
            filter: `drop-shadow(0 0 60px ${VYBE_PRIMARY}60)`,
          }}
        />
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 18,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.6)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Changelog v1.1.0
        </span>
      </div>
    </AbsoluteFill>
  );
};
