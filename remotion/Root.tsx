import {Composition} from "remotion";
import {MetaReel, type HookVariant} from "./MetaReel";

const hooks: Array<{id: string; hook: HookVariant}> = [
  {id: "MetaReel-Problem", hook: "problem"},
  {id: "MetaReel-Curiosity", hook: "curiosity"},
  {id: "MetaReel-Outcome", hook: "outcome"},
];

export const RemotionRoot = () => (
  <>
    {hooks.map(({id, hook}) => (
      <Composition
        key={id}
        id={id}
        component={MetaReel}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={330}
        defaultProps={{hook}}
      />
    ))}
  </>
);
