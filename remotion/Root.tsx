import {Composition} from "remotion";
import {MetaReel, type HookVariant} from "./MetaReel";
import {socialContent} from "./content";
import {SocialReel} from "./SocialReel";
import {SlidingScreenReel} from "./SlidingScreenReel";
import {CatScreenReel} from "./CatScreenReel";

const hooks: Array<{id: string; hook: HookVariant}> = [
  {id: "MetaReel-Problem", hook: "problem"},
  {id: "MetaReel-Curiosity", hook: "curiosity"},
  {id: "MetaReel-Outcome", hook: "outcome"},
];

export const RemotionRoot = () => (
  <>
    <Composition
      id="CY-Kedi-Sinekligi"
      component={CatScreenReel}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={600}
    />
    <Composition
      id="CY-Surme-Sineklik"
      component={SlidingScreenReel}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={330}
    />
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
    {socialContent.flatMap((item) => {
      const variants = item.hookVariants ? [0, 1, 2] : [0];
      return variants.map((variantIndex) => (
        <Composition
          key={`${item.day}-${variantIndex}`}
          id={`CY-${String(item.day).padStart(2, "0")}-${item.slug}${item.hookVariants ? `-${["A", "B", "C"][variantIndex]}` : ""}`}
          component={SocialReel}
          width={1080}
          height={1920}
          fps={30}
          durationInFrames={item.durationInSeconds * 30}
          defaultProps={{item, variantIndex}}
        />
      ));
    })}
  </>
);
