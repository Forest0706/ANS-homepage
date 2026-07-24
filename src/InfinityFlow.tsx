import { useEffect, useId, useRef } from "react";

const VIEW_W = 1024;
const VIEW_H = 859;

/**
 * Figure-8 track fitted to infinity-flow-transparent-v2.png (viewBox 1024×859).
 * Crossing ~ (562,442) on the filament X; right loop slightly wider to match art.
 */
const ORBIT_PATH =
  "M197.7,443.5L198.7,453.4L200.4,463.0L203.5,471.8L208.6,480.7L214.2,488.7L220.4,496.5L227.3,503.8L235.0,510.6L243.7,516.7L253.3,522.2L263.7,526.9L273.7,531.0L283.9,534.5L294.8,537.5L305.5,539.7L316.4,541.3L327.3,542.2L338.2,542.4L349.4,541.8L359.7,541.1L370.7,540.2L381.0,538.7L390.9,536.8L400.4,534.6L409.5,532.0L418.9,529.1L427.4,526.1L435.5,523.0L443.9,519.5L452.1,515.8L460.4,511.8L468.3,507.7L475.8,503.6L483.2,499.3L490.4,495.0L497.4,490.6L504.3,486.1L511.0,481.6L517.6,477.0L524.2,472.4L530.6,467.7L537.1,462.9L544.7,456.9L554.8,448.6L560.5,443.6L562.0,442.2L563.4,441.3L568.9,437.4L578.5,430.0L586.2,424.4L592.0,419.6L598.4,414.8L604.1,410.2L610.2,405.6L616.9,401.1L623.9,396.6L630.7,392.2L637.4,387.9L644.3,383.7L651.4,379.5L658.8,375.5L666.4,371.7L674.2,368.0L682.3,364.4L690.6,361.1L699.2,358.0L708.1,355.1L717.6,352.6L726.9,350.5L736.5,348.6L745.7,347.1L755.5,345.7L765.6,345.0L775.9,344.8L786.4,345.3L797.5,346.3L808.2,347.4L818.2,349.3L828.2,352.0L838.4,355.4L848.1,359.6L857.6,364.8L866.7,370.8L875.2,376.7L883.3,383.5L891.1,391.0L897.3,398.7L902.5,406.8L905.8,416.2L908.6,425.1L910.9,433.7L911.6,443.4L910.6,452.9L909.2,462.7L906.4,471.8L902.4,480.7L897.2,489.7L891.3,497.7L884.2,505.2L875.8,511.9L867.4,517.6L857.9,522.4L848.5,527.1L838.5,531.4L828.1,534.6L817.7,537.3L807.3,539.4L796.7,540.7L786.4,541.5L776.4,541.7L765.8,541.5L755.5,540.8L745.7,539.6L735.8,538.1L726.2,536.2L717.0,533.9L708.0,531.3L699.3,528.5L690.8,525.4L682.6,522.0L674.6,518.5L666.8,514.8L659.2,510.9L651.8,506.9L644.2,502.8L637.0,498.6L630.4,494.3L624.3,489.9L617.7,485.5L610.5,481.2L604.0,476.9L598.2,472.6L592.3,468.2L586.1,463.2L579.0,457.4L569.1,448.7L563.4,443.6L562.0,442.2L560.5,441.3L554.9,437.5L545.1,430.5L537.2,424.6L530.9,419.8L524.4,414.9L518.0,410.3L511.6,405.6L504.8,401.2L497.5,397.2L490.4,393.0L483.0,388.5L475.2,383.9L467.8,379.8L460.5,375.9L452.3,371.8L444.1,368.0L436.0,364.4L427.3,361.1L418.1,358.0L409.0,355.1L400.0,352.6L390.7,350.5L380.7,349.0L370.7,347.6L360.1,346.4L349.7,345.8L338.5,345.5L328.0,345.7L316.7,346.0L305.9,347.3L294.9,349.6L284.6,352.4L273.8,355.9L263.0,359.6L253.0,364.2L243.8,369.7L235.3,375.8L227.5,382.7L220.5,390.2L214.2,398.3L208.8,407.1L204.4,415.7L200.8,425.0L198.3,434.4L197.7,443.5";

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
        <g ref={dotARef} className="infinity-orbit-dot" transform="translate(197.7 443.5)">
          <circle r="9" fill={`url(#${glowA})`} />
          <circle r="2.6" fill="#fff" />
        </g>
        <g ref={dotBRef} className="infinity-orbit-dot" transform="translate(911.6 443.4)">
          <circle r="9" fill={`url(#${glowB})`} />
          <circle r="2.6" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
