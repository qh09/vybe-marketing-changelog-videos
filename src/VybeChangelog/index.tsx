import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IntroScene } from "./IntroScene";
import { TitleCard } from "./TitleCard";
import { FeaturesScene, TemplatesScene } from "./FeaturesScene";
import { ImprovementsScene } from "./ImprovementsScene";
import { IntegrationsScene } from "./IntegrationsScene";
import { OutroScene } from "./OutroScene";

// Scene durations in frames (at 30fps)
const INTRO_DURATION = 90; // 3 seconds
const TITLE_DURATION = 105; // 3.5 seconds
const AI_SUGGESTIONS_DURATION = 135; // 4.5 seconds
const TEMPLATES_DURATION = 135; // 4.5 seconds
const IMPROVEMENTS_DURATION = 150; // 5 seconds
const INTEGRATIONS_DURATION = 180; // 6 seconds
const OUTRO_DURATION = 120; // 4 seconds

const TRANSITION_DURATION = 20;

export const VybeChangelog: React.FC = () => {
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

      {/* AI Suggestions Feature */}
      <TransitionSeries.Sequence durationInFrames={AI_SUGGESTIONS_DURATION}>
        <FeaturesScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Templates Feature */}
      <TransitionSeries.Sequence durationInFrames={TEMPLATES_DURATION}>
        <TemplatesScene />
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
// Scenes: 90 + 105 + 135 + 135 + 150 + 180 + 120 = 915 frames
// Transitions: 6 * 20 = 120 frames subtracted
// Total: 915 - 120 = 795 frames (about 26.5 seconds at 30fps)
export const TOTAL_DURATION = 795;
