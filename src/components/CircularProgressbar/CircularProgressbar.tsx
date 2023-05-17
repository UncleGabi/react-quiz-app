import { CircularProgressbarProps } from "./CircularProgressbar.d";
import "./CircularProgressbar.scss";

function CircularProgressbar(props: CircularProgressbarProps) {
  const { mainTitle, subtitle, percentage } = props;
  const circumFerence = 2 * 65 * Math.PI;
  const pct = circumFerence * (1 - percentage);
  const strokeDasharray = `${pct}, ${circumFerence}`;

  return (
    <div className="circular-progressbar">
      <svg width={220} height={220}>
        <circle
          className="circular-progressbar__bg"
          r="65"
          cx="110"
          cy="110"
          strokeWidth="7"
          fill="none"
        />
        <circle
          className="circular-progressbar__bar"
          r="65"
          cx="110"
          cy="110"
          strokeDasharray={strokeDasharray}
          strokeWidth="7"
          fill="none"
          transform="rotate(-90, 110, 110)"
        />
      </svg>
      <div className="circular-progressbar__title">
        <div className="circular-progressbar__main-title">{mainTitle}</div>
        <div className="circular-progressbar__sub-title">{subtitle}</div>
      </div>
    </div>
  );
}

export default CircularProgressbar;
