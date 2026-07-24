import { useEffect, useId, useRef } from "react";

const VIEW_W = 1024;
const VIEW_H = 859;

/**
 * Figure-8 track fitted to infinity-flow-transparent-v2.png (viewBox 1024×859).
 * Crossing pinned to the white filament X (~546,437); tips inset from guide spikes.
 */
const ORBIT_PATH =
  "M169.4,435.1L169.9,445.1L172.3,455.8L176.3,465.8L181.4,474.7L187.9,483.2L195.9,491.1L204.7,498.6L214.6,505.4L225.1,510.9L235.6,515.6L246.9,519.8L259.1,523.4L270.9,526.4L282.9,529.2L295.4,531.4L308.1,532.4L320.8,532.3L332.4,531.7L344.0,530.5L356.1,528.5L367.6,526.2L378.6,523.8L389.3,521.0L399.6,517.9L409.6,514.5L419.3,510.9L428.8,507.0L437.9,503.0L446.8,498.8L455.4,494.4L463.8,489.9L471.9,485.3L481.7,479.4L500.2,467.5L526.0,450.4L545.4,437.4L545.6,437.2L545.7,437.2L545.8,437.1L545.9,437.1L545.9,437.0L546.0,437.0L546.1,436.9L546.1,436.9L546.2,436.8L546.3,436.8L546.3,436.7L546.6,436.5L547.8,435.6L587.2,404.0L603.9,391.3L613.2,385.2L621.1,380.6L628.5,376.1L636.0,371.7L644.1,367.5L652.3,363.4L660.9,359.7L669.8,356.0L679.0,352.7L688.4,349.5L698.1,346.8L708.2,344.3L718.5,342.3L729.2,340.7L740.2,339.6L751.4,339.3L763.3,339.5L775.5,339.9L787.2,341.0L798.2,342.9L808.8,345.7L819.5,349.2L830.1,353.5L840.2,358.6L849.5,364.6L858.4,371.5L866.6,379.4L874.2,388.2L881.2,397.2L886.5,406.4L890.5,416.2L893.4,425.5L892.4,434.6L891.5,444.7L889.6,454.9L885.9,464.9L880.8,474.0L874.2,482.5L866.6,490.5L858.5,497.8L849.7,504.5L840.0,510.4L829.7,515.5L819.3,519.8L809.0,523.4L798.0,526.2L786.4,528.2L775.1,529.6L763.7,530.4L751.6,530.6L740.0,530.1L729.1,528.9L718.5,527.1L708.2,524.9L698.1,522.4L688.4,519.5L678.9,516.3L669.8,513.0L661.0,509.3L652.7,505.6L644.5,501.5L636.7,497.3L629.1,492.9L621.8,488.5L614.2,484.1L604.5,478.6L587.5,467.1L547.8,438.3L546.6,437.4L546.3,437.2L546.3,437.2L546.2,437.1L546.1,437.1L546.1,437.0L546.0,437.0L545.9,436.9L545.9,436.9L545.8,436.8L545.7,436.8L545.6,436.7L545.4,436.5L526.0,422.9L500.2,405.0L481.5,392.2L471.6,385.6L463.8,380.9L456.0,376.6L447.3,372.0L438.3,367.5L429.3,363.4L419.9,359.7L409.8,356.0L399.5,352.7L389.2,349.5L378.2,346.8L366.6,344.3L355.1,342.3L343.9,340.8L332.7,339.7L320.6,339.1L307.7,339.1L295.1,339.6L283.1,341.0L271.6,343.0L259.8,345.7L247.5,349.2L236.2,353.6L225.6,359.1L215.2,365.9L205.0,373.2L195.2,380.3L186.6,387.7L179.9,396.1L175.1,405.5L171.9,415.7L170.0,425.6L169.4,435.1";

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
        <g ref={dotARef} className="infinity-orbit-dot" transform="translate(169.4 435.1)">
          <circle r="9" fill={`url(#${glowA})`} />
          <circle r="2.6" fill="#fff" />
        </g>
        <g ref={dotBRef} className="infinity-orbit-dot" transform="translate(893.4 425.5)">
          <circle r="9" fill={`url(#${glowB})`} />
          <circle r="2.6" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
