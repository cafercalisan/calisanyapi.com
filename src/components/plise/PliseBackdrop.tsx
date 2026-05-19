"use client";

/**
 * Stylised pleated-screen backdrop. Renders as a pair of door panels with
 * a fine vertical-pleat pattern (CSS only). Designed to fill any parent.
 *
 * Variants:
 *   - solid: opaque dark background behind, used as door panel
 *   - transparent: only the pleat texture, used as overlay
 */
export default function PliseBackdrop({
  variant = "solid",
  side = "left",
}: {
  variant?: "solid" | "transparent";
  side?: "left" | "right";
}) {
  const handle =
    side === "left"
      ? "right-0 mr-[2px]"
      : "left-0 ml-[2px]";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {variant === "solid" && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a3144] via-[#1a2030] to-[#0e1322]" />
      )}
      {/* Pleat lines — vertical accordion folds */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(90deg, rgba(0,0,0,0.7) 3px, rgba(0,0,0,0.7) 4px, transparent 4px, transparent 6px)",
        }}
      />
      {/* Subtle shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      {/* Frame edge near handle (the seam where panels meet) */}
      <div
        className={`absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-white/20 via-white/5 to-white/20 ${handle}`}
      />
    </div>
  );
}
