import classes from "./RatingBadge.module.css";

// type Rating = "top" | "excellence";

interface IRatingBadgeProps {
  year: number;
  rating: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
}

export function RatingBadge({
  year,
  rating,
  width,
  height,
  backgroundColor,
  color,
}: IRatingBadgeProps) {
  return (
    <div
      className={`${classes.container} ${rating === "FIRST" ? classes.red : classes.blue}`}
      style={{ width: width, height: height, backgroundColor: backgroundColor }}
    >
      <div className={classes.element} style={{ color: color }}>
        {`${year} ${rating === "FIRST" ? "🥇최우수" : "🥈우수"}`}
      </div>
    </div>
  );
}
