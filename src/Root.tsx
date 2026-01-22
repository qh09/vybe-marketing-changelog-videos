import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { VybeChangelog, TOTAL_DURATION } from "./VybeChangelog";
import {
  VybeChangelogMobile,
  TOTAL_DURATION_MOBILE,
} from "./VybeChangelog/mobile";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Vybe Changelog - Desktop (1920x1080) */}
      <Composition
        id="VybeChangelogv110"
        component={VybeChangelog}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Vybe Changelog - Mobile (1080x1920) */}
    </>
  );
};
