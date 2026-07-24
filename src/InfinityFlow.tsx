import { useEffect, useId, useRef } from "react";

const VIEW_W = 1024;
const VIEW_H = 859;

/** Figure-8 track fitted to infinity-flow-transparent-v2.png (viewBox 1024×859). */
const ORBIT_PATH =
  "M106.0,440.0L107.8,456.9L113.2,473.3L121.9,488.9L133.7,503.2L148.1,515.9L164.5,526.9L182.7,536.1L202.0,543.3L222.0,548.7L242.4,552.2L262.8,554.1L283.0,554.5L302.8,553.5L322.1,551.3L340.7,548.0L358.6,543.8L375.8,538.8L392.3,533.1L408.0,526.9L423.1,520.2L437.6,513.1L451.6,505.6L465.0,497.9L478.0,490.0L490.6,481.9L502.8,473.7L514.8,465.3L526.7,456.9L538.4,448.5L550.0,440.0L561.6,431.5L573.3,423.1L585.2,414.7L597.2,406.3L609.4,398.1L622.0,390.0L635.0,382.1L648.4,374.4L662.4,366.9L676.9,359.8L692.0,353.1L707.7,346.9L724.2,341.2L741.4,336.2L759.3,332.0L777.9,328.7L797.2,326.5L817.0,325.5L837.2,325.9L857.6,327.8L878.0,331.3L898.0,336.7L917.3,343.9L935.5,353.1L951.9,364.1L966.3,376.8L978.1,391.1L986.8,406.7L992.2,423.1L994.0,440.0L992.2,456.9L986.8,473.3L978.1,488.9L966.3,503.2L951.9,515.9L935.5,526.9L917.3,536.1L898.0,543.3L878.0,548.7L857.6,552.2L837.2,554.1L817.0,554.5L797.2,553.5L777.9,551.3L759.3,548.0L741.4,543.8L724.2,538.8L707.7,533.1L692.0,526.9L676.9,520.2L662.4,513.1L648.4,505.6L635.0,497.9L622.0,490.0L609.4,481.9L597.2,473.7L585.2,465.3L573.3,456.9L561.6,448.5L550.0,440.0L538.4,431.5L526.7,423.1L514.8,414.7L502.8,406.3L490.6,398.1L478.0,390.0L465.0,382.1L451.6,374.4L437.6,366.9L423.1,359.8L408.0,353.1L392.3,346.9L375.8,341.2L358.6,336.2L340.7,332.0L322.1,328.7L302.8,326.5L283.0,325.5L262.8,325.9L242.4,327.8L222.0,331.3L202.0,336.7L182.7,343.9L164.5,353.1L148.1,364.1L133.7,376.8L121.9,391.1L113.2,406.7L107.8,423.1L106.0,440.0";

const LOOP_MS = 11000;

type InfinityFlowProps = {
  small?: boolean;
  icon?: boolean;
};

export default function InfinityFlow({ small = false, icon = false }: InfinityFlowProps) {
  const uid = useId().replace(/:/g, "");
  const glowA = `infinityDotGlowA-${uid}`;
  const glowB = `infinityDotGlowB-${uid}`;
  const pathRef = useRef<SVGPathElement>(null);
  const dotARef = useRef<SVGGElement>(null);
  const dotBRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (icon) return;

    const path = pathRef.current;
    const dotA = dotARef.current;
    const dotB = dotBRef.current;
    if (!path || !dotA || !dotB) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let start = 0;

    const place = (el: SVGGElement, distance: number, total: number) => {
      const point = path.getPointAtLength(((distance % total) + total) % total);
      el.setAttribute("transform", `translate(${point.x} ${point.y})`);
    };

    const tick = (now: number) => {
      if (!start) start = now;
      const total = path.getTotalLength();
      if (total <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = ((now - start) % LOOP_MS) / LOOP_MS;
      place(dotA, progress * total, total);
      place(dotB, (progress + 0.5) * total, total);
      raf = requestAnimationFrame(tick);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      start = 0;
      if (mq.matches) {
        dotA.setAttribute("opacity", "0");
        dotB.setAttribute("opacity", "0");
        return;
      }
      dotA.setAttribute("opacity", "1");
      dotB.setAttribute("opacity", "1");
      raf = requestAnimationFrame(tick);
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
    };
  }, [icon]);

  if (icon) {
    return (
      <div className="infinity infinity-icon" aria-hidden="true">
        <img src="/ans-logo-transparent-v2.png" alt="" />
      </div>
    );
  }

  return (
    <div className={`infinity ${small ? "infinity-small" : ""}`} aria-hidden="true">
      <svg
        className="infinity-svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
      >
        <defs>
          <radialGradient id={glowA} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="22%" stopColor="#ffd5a7" />
            <stop offset="55%" stopColor="#ff7a1a" />
            <stop offset="100%" stopColor="rgba(127,43,0,0)" />
          </radialGradient>
          <radialGradient id={glowB} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="22%" stopColor="#c8e7ff" />
            <stop offset="55%" stopColor="#2f77ff" />
            <stop offset="100%" stopColor="rgba(10,40,90,0)" />
          </radialGradient>
        </defs>
        <image
          href="/infinity-flow-transparent-v2.png"
          width={VIEW_W}
          height={VIEW_H}
          preserveAspectRatio="xMidYMid meet"
        />
        <path ref={pathRef} d={ORBIT_PATH} fill="none" stroke="none" />
        <g ref={dotARef} className="infinity-orbit-dot">
          <circle r="14" fill={`url(#${glowA})`} />
          <circle r="3.4" fill="#fff" />
        </g>
        <g ref={dotBRef} className="infinity-orbit-dot">
          <circle r="14" fill={`url(#${glowB})`} />
          <circle r="3.4" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
