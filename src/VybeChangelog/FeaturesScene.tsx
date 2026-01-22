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

interface FeatureWithImageProps {
  title: string;
  description: string;
  image: string;
  delay: number;
}

// Smooth easeOut curve for more professional animations
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const FeatureWithImage: React.FC<FeatureWithImageProps> = ({
  title,
  description,
  image,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth fade-in with easeOut instead of bouncy spring
  const contentRaw = interpolate(frame - delay, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contentProgress = easeOut(contentRaw);

  const imageRaw = interpolate(frame - delay - 8, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imageProgress = easeOut(imageRaw);

  const contentY = interpolate(contentProgress, [0, 1], [30, 0]);
  const contentOpacity = contentProgress;

  // No scale - just smooth slide up and fade
  const imageY = interpolate(imageProgress, [0, 1], [40, 0]);
  const imageOpacity = imageProgress;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        flex: 1,
      }}
    >
      {/* Text content - on top */}
      <div
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "8px 16px",
            borderRadius: 8,
            background: `${VYBE_PRIMARY}20`,
            border: `1px solid ${VYBE_PRIMARY}40`,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: VYBE_SECONDARY,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            New Feature
          </span>
        </div>
        <h3
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 56,
            fontWeight: 700,
            color: "#fff",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 24,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
        >
          {description}
        </p>
      </div>

      {/* Image - below, big */}
      <div
        style={{
          flex: 1,
          opacity: imageOpacity,
          transform: `translateY(${imageY}px)`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            boxShadow: `0 30px 80px rgba(0, 0, 0, 0.5)`,
            maxHeight: "100%",
          }}
        >
          <Img
            src={staticFile(image)}
            style={{
              width: "auto",
              height: "100%",
              maxWidth: 1600,
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerRaw = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerProgress = easeOut(headerRaw);

  const headerOpacity = headerProgress;
  const headerY = interpolate(headerProgress, [0, 1], [20, 0]);

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
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 40,
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
            New Features
          </span>
        </div>
      </div>

      {/* Feature with image */}
      <FeatureWithImage
        title="AI Suggestions"
        description="Persistent AI suggestions saved with your project. Access and revisit suggestions after reloading for consistent guidance throughout your workflow."
        image="feature-ai-suggestions.png"
        delay={10}
      />
    </AbsoluteFill>
  );
};

export const TemplatesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerRaw = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerProgress = easeOut(headerRaw);

  const headerOpacity = headerProgress;
  const headerY = interpolate(headerProgress, [0, 1], [20, 0]);

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
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 40,
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
            New Features
          </span>
        </div>
      </div>

      {/* Feature with image */}
      <FeatureWithImage
        title="App Templates"
        description="Discover and fork templates from best operators. Browse ready-made templates to kickstart your projects faster than ever."
        image="feature-templates.png"
        delay={10}
      />
    </AbsoluteFill>
  );
};
