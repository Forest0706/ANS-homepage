import { useEffect, useId, useRef } from "react";

const VIEW_W = 1024;
const VIEW_H = 859;

/**
 * Figure-8 track fitted to the filament body of infinity-flow-transparent-v2.png
 * (viewBox 1024×859). Inset from horizontal guide-line spikes so dots stay on-glow.
 */
const ORBIT_PATH =
  "M211.9,443.8L213.4,454.4L215.6,465.5L219.3,477.0L224.4,488.3L231.0,499.0L239.2,508.8L248.7,517.5L259.5,525.2L271.2,531.7L283.0,537.0L294.6,541.2L306.1,544.3L317.8,546.4L330.1,547.4L343.1,547.6L356.2,546.9L368.8,545.5L380.5,543.4L391.6,540.7L402.1,537.6L411.8,534.1L420.6,530.5L428.9,526.6L437.2,522.3L445.9,517.4L454.9,511.8L464.0,505.7L472.7,499.5L480.9,493.2L488.6,487.0L496.2,480.7L503.8,474.2L511.3,467.7L518.4,461.3L525.0,455.3L531.5,449.2L538.5,442.5L546.0,435.1L553.8,427.7L561.3,420.6L568.7,413.8L576.1,407.2L583.4,400.6L590.5,394.2L597.6,387.9L604.7,381.9L612.0,376.0L619.5,370.3L627.5,364.8L635.8,359.6L644.6,354.7L653.8,350.0L663.5,345.7L673.6,341.8L684.1,338.4L695.0,335.5L706.3,333.3L718.0,331.8L729.7,331.1L741.3,331.1L753.0,332.1L765.0,334.1L777.5,337.1L790.1,341.3L802.2,346.8L813.3,353.5L823.3,361.5L832.6,370.8L841.3,381.1L849.0,392.3L855.0,404.2L859.1,416.5L861.4,428.8L862.3,441.1L861.9,453.4L859.9,465.5L856.0,477.2L850.1,488.4L842.2,499.0L832.7,508.8L822.2,517.5L811.2,525.2L800.1,531.7L788.8,537.0L777.2,541.2L765.2,544.2L753.2,546.2L741.3,547.2L729.6,547.2L717.9,546.5L706.5,545.0L695.3,542.8L684.5,539.9L673.9,536.5L663.7,532.6L654.1,528.3L645.1,523.6L636.8,518.7L628.9,513.5L621.2,508.0L613.6,502.5L606.1,497.0L598.5,491.9L590.8,486.9L583.2,481.4L575.5,475.4L567.9,469.0L560.3,462.6L552.6,456.1L545.1,449.4L538.2,442.5L531.9,435.3L525.6,428.1L519.0,421.2L511.7,414.9L504.1,408.8L496.4,402.8L488.4,396.6L480.2,390.0L471.8,383.5L463.2,377.3L454.5,371.4L445.5,365.8L436.4,360.4L427.1,355.4L417.6,350.6L407.8,346.1L397.6,342.0L387.0,338.5L375.9,335.5L364.5,333.3L353.0,331.8L341.3,331.1L329.4,331.1L317.6,332.1L305.9,334.1L294.2,337.1L282.6,341.3L271.3,346.6L260.5,353.1L250.5,360.8L241.5,369.5L233.4,379.3L226.4,390.1L220.7,401.8L216.5,414.6L213.8,428.7L211.9,443.8";

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
      const total = path.getTotalLength();
      if (total > 0) {
        place(dotA, 0, total);
        place(dotB, total * 0.5, total);
      }
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
        width={VIEW_W}
        height={VIEW_H}
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
      >
        <defs>
          <radialGradient id={glowA} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="28%" stopColor="#ffd5a7" />
            <stop offset="62%" stopColor="#ff7a1a" />
            <stop offset="100%" stopColor="rgba(127,43,0,0)" />
          </radialGradient>
          <radialGradient id={glowB} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="28%" stopColor="#c8e7ff" />
            <stop offset="62%" stopColor="#2f77ff" />
            <stop offset="100%" stopColor="rgba(10,40,90,0)" />
          </radialGradient>
        </defs>
        <image
          className="infinity-art"
          href="/infinity-flow-transparent-v2.png"
          width={VIEW_W}
          height={VIEW_H}
          preserveAspectRatio="xMidYMid meet"
        />
        <path ref={pathRef} d={ORBIT_PATH} fill="none" stroke="none" />
        <g ref={dotARef} className="infinity-orbit-dot" transform="translate(211.9 443.8)">
          <circle r="9" fill={`url(#${glowA})`} />
          <circle r="2.6" fill="#fff" />
        </g>
        <g ref={dotBRef} className="infinity-orbit-dot" transform="translate(862.3 441.1)">
          <circle r="9" fill={`url(#${glowB})`} />
          <circle r="2.6" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
