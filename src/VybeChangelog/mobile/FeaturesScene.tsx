import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { VYBE_PRIMARY, VYBE_SECONDARY, VYBE_DARK_BG } from "../colors";

interface FeatureWithImageProps {
  title: string;
  description: string;
  image: string;
  delay: number;
}

const FeatureWithImage: React.FC<FeatureWithImageProps> = ({
  title,
  description,
  image,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contentProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 15, stiffness: 80 },
  });

  const imageProgress = spring({
    frame,
    fps,
    delay: delay + 10,
    config: { damping: 12 },
  });

  const contentY = interpolate(contentProgress, [0, 1], [40, 0]);
  const contentOpacity = contentProgress;

  const imageScale = imageProgress;
  const imageY = interpolate(imageProgress, [0, 1], [30, 0]);
  const imageOpacity = imageProgress;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        flex: 1,
      }}
    >
      <div
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "6px 14px",
            borderRadius: 8,
            background: `${VYBE_PRIMARY}20`,
            border: `1px solid ${VYBE_PRIMARY}40`,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 12,
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
            fontSize: 42,
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
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          opacity: imageOpacity,
          transform: `scale(${imageScale}) translateY(${imageY}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            boxShadow: `0 30px 80px rgba(0, 0, 0, 0.5)`,
          }}
        >
          <Img
            src={staticFile(image)}
            style={{
              width: "100%",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const FeaturesSceneMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const headerOpacity = headerProgress;
  const headerY = interpolate(headerProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: VYBE_DARK_BG,
        padding: 50,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: VYBE_PRIMARY,
              boxShadow: `0 0 20px ${VYBE_PRIMARY}`,
            }}
          />
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 18,
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

      <FeatureWithImage
        title="AI Suggestions"
        description="Persistent AI suggestions saved with your project. Access and revisit suggestions after reloading for consistent guidance."
        image="feature-ai-suggestions.png"
        delay={10}
      />
    </AbsoluteFill>
  );
};

export const TemplatesSceneMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const headerOpacity = headerProgress;
  const headerY = interpolate(headerProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: VYBE_DARK_BG,
        padding: 50,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: VYBE_PRIMARY,
              boxShadow: `0 0 20px ${VYBE_PRIMARY}`,
            }}
          />
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 18,
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

      <FeatureWithImage
        title="App Templates"
        description="Discover and fork templates from best operators. Browse ready-made templates to kickstart your projects."
        image="feature-templates.png"
        delay={10}
      />
    </AbsoluteFill>
  );
};
