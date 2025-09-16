import { categoryData } from "../Sidebar/Sidebar";
import classes from "./CategoryBadge.module.css";

interface ICategoryBadgeProps {
  category: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
}

export function CategoryBadge({
  category,
  width,
  height,
  backgroundColor,
  color,
}: ICategoryBadgeProps) {
  return (
    <div
      className={`${classes.container} ${classes[categoryData[category].color]}`}
      style={{ width: width, height: height, backgroundColor: backgroundColor }}
    >
      <div className={classes.element} style={{ color: color }}>
        {categoryData[category].text}
      </div>
    </div>
  );
}
