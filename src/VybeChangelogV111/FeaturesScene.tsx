import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
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
            maxWidth: 1200,
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

// Feature without image (text-only with icon)
interface FeatureTextOnlyProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

const FeatureTextOnly: React.FC<FeatureTextOnlyProps> = ({
  title,
  description,
  icon,
  delay,
}) => {
  const frame = useCurrentFrame();

  const contentRaw = interpolate(frame - delay, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contentProgress = easeOut(contentRaw);

  const contentY = interpolate(contentProgress, [0, 1], [30, 0]);
  const contentOpacity = contentProgress;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
          textAlign: "center",
          maxWidth: 1200,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            background: `linear-gradient(135deg, ${VYBE_PRIMARY}30 0%, ${VYBE_SECONDARY}20 100%)`,
            border: `2px solid ${VYBE_PRIMARY}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            boxShadow: `0 20px 60px ${VYBE_PRIMARY}30`,
          }}
        >
          {icon}
        </div>

        <div
          style={{
            display: "inline-flex",
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
            fontSize: 64,
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
            fontSize: 28,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export const ClarificationQuestionsScene: React.FC = () => {
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
        title="AI Clarification Questions"
        description="The agent can now ask you clarification questions using select and multi-select options, ensuring more precise responses and better interaction flow."
        image="feature-clarification-questions.png"
        delay={10}
      />
    </AbsoluteFill>
  );
};

export const OpenAPIToolsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerRaw = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerProgress = easeOut(headerRaw);

  const headerOpacity = headerProgress;
  const headerY = interpolate(headerProgress, [0, 1], [20, 0]);

  const contentRaw = interpolate(frame - 10, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contentProgress = easeOut(contentRaw);
  const contentY = interpolate(contentProgress, [0, 1], [30, 0]);

  const logoRaw = interpolate(frame - 5, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoProgress = easeOut(logoRaw);

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

      {/* Feature with OpenAPI logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 50,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* OpenAPI Logo */}
        <div
          style={{
            opacity: logoProgress,
            transform: `translateY(${interpolate(logoProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              padding: "40px 60px",
              borderRadius: 24,
              background: "#fff",
              boxShadow: `0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px ${VYBE_PRIMARY}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile("logos/openapi.png")}
              style={{
                height: 80,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Text content */}
        <div
          style={{
            opacity: contentProgress,
            transform: `translateY(${contentY}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            alignItems: "center",
            textAlign: "center",
            maxWidth: 1100,
          }}
        >
          <div
            style={{
              display: "inline-flex",
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
              fontSize: 64,
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Enhanced OpenAPI Tools
          </h3>
          <p
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: 28,
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.6)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Refined tool names and upgraded OpenAPI directive for clearer use.
            <br />
            Plus a new tool to automatically generate an OpenAPI client for your custom APIs.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
