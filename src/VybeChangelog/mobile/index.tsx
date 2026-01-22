import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IntroSceneMobile } from "./IntroScene";
import { TitleCardMobile } from "./TitleCard";
import { FeaturesSceneMobile, TemplatesSceneMobile } from "./FeaturesScene";
import { ImprovementsSceneMobile } from "./ImprovementsScene";
import { IntegrationsSceneMobile } from "./IntegrationsScene";
import { OutroSceneMobile } from "./OutroScene";

// Scene durations in frames (at 30fps)
const INTRO_DURATION = 90;
const TITLE_DURATION = 105;
const AI_SUGGESTIONS_DURATION = 135;
const TEMPLATES_DURATION = 135;
const IMPROVEMENTS_DURATION = 150;
const INTEGRATIONS_DURATION = 180;
const OUTRO_DURATION = 120;

const TRANSITION_DURATION = 20;

export const VybeChangelogMobile: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
        <IntroSceneMobile />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      <TransitionSeries.Sequence durationInFrames={TITLE_DURATION}>
        <TitleCardMobile />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      <TransitionSeries.Sequence durationInFrames={AI_SUGGESTIONS_DURATION}>
        <FeaturesSceneMobile />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      <TransitionSeries.Sequence durationInFrames={TEMPLATES_DURATION}>
        <TemplatesSceneMobile />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      <TransitionSeries.Sequence durationInFrames={IMPROVEMENTS_DURATION}>
        <ImprovementsSceneMobile />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      <TransitionSeries.Sequence durationInFrames={INTEGRATIONS_DURATION}>
        <IntegrationsSceneMobile />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
        <OutroSceneMobile />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export const TOTAL_DURATION_MOBILE = 795;
