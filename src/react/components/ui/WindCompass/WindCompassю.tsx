import styles from "./WindCompass.module.scss";

interface WindCompassProps {
  speed?: number;
}

export const WindCompass = ({ speed = 9.7 }: WindCompassProps) => {
  const size = 200;
  const center = size / 2;
  const radius = center - 10;
  const ticks = Array.from({ length: 72 });

  return (
    <svg
      className={styles.compass}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle cx={center} cy={center} r={radius} stroke="none" fill="none" />
      {ticks.map((_, i) => {
        const angle = (i * 5 - 90) * (Math.PI / 180);
        const isLong = i % 6 === 0;

        const start = radius - 4;
        const end = radius + 4;

        const x1 = center + Math.cos(angle) * start;
        const y1 = center + Math.sin(angle) * start;
        const x2 = center + Math.cos(angle) * end;
        const y2 = center + Math.sin(angle) * end;

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isLong ? "#fff" : "#ccc"}
            strokeWidth={isLong ? 2 : 1}
            opacity={isLong ? 1 : 0.5}
          />
        );
      })}

      {[
        { label: "N", angle: -90 },
        { label: "E", angle: 0 },
        { label: "S", angle: 90 },
        { label: "W", angle: 180 },
      ].map(({ label, angle }) => {
        const rad = (angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * (radius - 25);
        const y = center + Math.sin(rad) * (radius - 25);
        return (
          <text
            key={label}
            x={x}
            y={y}
            fill="#fff"
            fontSize="16"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
          >
            {label}
          </text>
        );
      })}
      <text
        x={center}
        y={center - 10}
        fill="#fff"
        fontSize="36"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="medium"
      >
        {speed}
      </text>
      <text
        x={center}
        y={center + 15}
        fill="#fff"
        fontSize="16"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        km/h
      </text>
    </svg>
  );
};
