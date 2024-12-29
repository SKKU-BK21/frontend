import { Proportion } from "@/types/conferences";
import classes from "./BarGraph.module.css";
import Image from "next/image";
import { countryToName } from "@/constants/country";
import { Flag } from "@/components/Flag/Flag";

export interface IBarGraphProps {
  proportions: Proportion[];
  height?: number;
}

export function BarGraph({ proportions, height }: IBarGraphProps) {
  const maxProportion = proportions ? Math.max(...proportions.map((item) => item.proportion)) : 0;

  proportions?.sort((a, b) => {
    if (a.country == "unknown") return 1;
    if (b.country == "unknown") return -1;
    return b.proportion - a.proportion;
  });
  return (
    <div className={classes["bar-chart-container"]} style={{ height: height }}>
      {proportions?.map((item) => (
        <div key={item.country} className={classes["bar-container"]}>
          <div
            className={`${classes.bar} ${item.country === "kr" ? classes.blue : ""}`}
            style={{
              height: `${(item.proportion / maxProportion) * 150}%`,
            }}
          >
            {item.country === "kr" && <Flag width={50} className={classes["flag-image"]} />}
          </div>
          <span className={classes.label}>
            {item.country == null ? "미분류" : countryToName[item.country]}
          </span>
        </div>
      ))}
    </div>
  );
}
