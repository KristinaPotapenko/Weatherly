import styles from "./PressureDial.module.scss";

interface PressureDialProps {
  pressure: number;
  minPressure?: number;
  maxPressure?: number;
  size?: number;
  segments?: number;
}

export const PressureDial: React.FC<PressureDialProps> = ({
  pressure = 950,
  minPressure = 950,
  maxPressure = 1050,
  size = 160,
  segments = 48,
}) => {
  const normalizedPressure = Math.max(
    minPressure,
    Math.min(maxPressure, pressure)
  );
  const pressurePercent =
    ((normalizedPressure - minPressure) / (maxPressure - minPressure)) * 100;

  const radius = size / 2 - 10;
  const center = size / 2;
  const angleStep = 360 / segments;
  const activeSegments = Math.round((pressurePercent / 100) * segments);

  const lines = Array.from({ length: segments }, (_, i) => {
    const angle = (i * angleStep - 90) * (Math.PI / 180);
    const x1 = center + Math.cos(angle) * (radius - 10);
    const y1 = center + Math.sin(angle) * (radius - 10);
    const x2 = center + Math.cos(angle) * radius;
    const y2 = center + Math.sin(angle) * radius;

    const isActive = i < activeSegments;
    const isLastActive = isActive && i === activeSegments - 1;

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={`${styles.dialLine} ${isActive ? styles.active : ""} ${
          isLastActive ? styles.lastActive : ""
        }`}
        strokeLinecap="round"
      />
    );
  });

  const displayPressure = normalizedPressure;
  const displayAngle = Math.max(
    0,
    Math.min(
      segments - 1,
      Math.round(
        ((displayPressure - minPressure) / (maxPressure - minPressure)) *
          segments
      )
    )
  );

  const textAngle = (displayAngle * angleStep - 90) * (Math.PI / 180);
  const textX = center + Math.cos(textAngle) * (radius + 15 + 10);
  const textY = center + Math.sin(textAngle) * (radius + 15 + 2);

  return (
    <div className={styles.dialContainer}>
      <svg width={size} height={size} className={styles.dialSvg}>
        {lines}
        <text
          x={textX}
          y={textY}
          className={styles.pressureText}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {displayPressure.toFixed(0)}
        </text>
      </svg>
    </div>
  );
};
