import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

// Vybe Brand Colors
const VYBE_PRIMARY = "#3905F5";
const VYBE_SECONDARY = "#7FC1FF";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
  variant?: "primary" | "secondary";
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
  variant = "primary",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accentColor = variant === "primary" ? VYBE_PRIMARY : VYBE_SECONDARY;

  const cardProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 15, stiffness: 80 },
  });

  const iconProgress = spring({
    frame,
    fps,
    delay: delay + 8,
    config: { damping: 12 },
  });

  const cardY = interpolate(cardProgress, [0, 1], [60, 0]);
  const cardOpacity = cardProgress;
  const iconScale = iconProgress;

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
        borderRadius: 24,
        padding: 40,
        border: `1px solid ${accentColor}30`,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        flex: 1,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${accentColor}30 0%, ${accentColor}10 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${iconScale})`,
          border: `1px solid ${accentColor}40`,
        }}
      >
        <span style={{ fontSize: 40 }}>{icon}</span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 32,
          fontWeight: 700,
          color: "#fff",
          margin: 0,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 22,
          fontWeight: 400,
          color: "rgba(255, 255, 255, 0.6)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
};
