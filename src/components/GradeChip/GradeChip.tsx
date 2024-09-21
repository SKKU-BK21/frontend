import classes from "./GradeChip.module.css";

type Grade = "top" | "excellence";

interface IGradeChipProps {
  year: number;
  grade: Grade;
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
}

export function GradeChip({ year, grade, width, height, backgroundColor, color }: IGradeChipProps) {
  return (
    <div
      className={`${classes.container} ${grade === "top" ? classes.red : classes.blue}`}
      style={{ width: width, height: height, backgroundColor: backgroundColor }}
    >
      <div className={classes.element} style={{ color: color }}>
        {`${year} ${grade === "top" ? "최우수" : "우수"}`}
      </div>
    </div>
  );
}
