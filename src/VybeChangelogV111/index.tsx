import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IntroScene } from "./IntroScene";
import { TitleCard } from "./TitleCard";
import { ClarificationQuestionsScene, OpenAPIToolsScene } from "./FeaturesScene";
import { ImprovementsScene } from "./ImprovementsScene";
import { IntegrationsScene } from "./IntegrationsScene";
import { OutroScene } from "./OutroScene";

// Scene durations in frames (at 30fps)
const INTRO_DURATION = 120; // 4 seconds
const TITLE_DURATION = 150; // 5 seconds
const CLARIFICATION_QUESTIONS_DURATION = 180; // 6 seconds
const OPENAPI_TOOLS_DURATION = 180; // 6 seconds
const IMPROVEMENTS_DURATION = 240; // 8 seconds (more items)
const INTEGRATIONS_DURATION = 240; // 8 seconds
const OUTRO_DURATION = 150; // 5 seconds

const TRANSITION_DURATION = 20;

export const VybeChangelogV111: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Intro - Logo animation */}
      <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Title Card */}
      <TransitionSeries.Sequence durationInFrames={TITLE_DURATION}>
        <TitleCard />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Clarification Questions Feature */}
      <TransitionSeries.Sequence durationInFrames={CLARIFICATION_QUESTIONS_DURATION}>
        <ClarificationQuestionsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* OpenAPI Tools Feature */}
      <TransitionSeries.Sequence durationInFrames={OPENAPI_TOOLS_DURATION}>
        <OpenAPIToolsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Improvements */}
      <TransitionSeries.Sequence durationInFrames={IMPROVEMENTS_DURATION}>
        <ImprovementsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Integrations Grid */}
      <TransitionSeries.Sequence durationInFrames={INTEGRATIONS_DURATION}>
        <IntegrationsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Outro */}
      <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

// Total duration calculation:
// Scenes: 120 + 150 + 180 + 180 + 240 + 240 + 150 = 1260 frames
// Transitions: 6 * 20 = 120 frames subtracted
// Total: 1260 - 120 = 1140 frames (38 seconds at 30fps)
export const TOTAL_DURATION_V111 = 1140;
