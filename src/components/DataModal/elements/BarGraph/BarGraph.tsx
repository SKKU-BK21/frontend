import { Proportion } from "@/types/conferences";
import classes from "./BarGraph.module.css";
import Image from "next/image";

export interface IBarGraphProps {
  proportions: Proportion[];
  height?: number;
}

export function BarGraph({ proportions, height }: IBarGraphProps) {
  const maxProportion = Math.max(...proportions.map((item) => item.proportion));

  return (
    <div className={classes["bar-chart-container"]} style={{ height: height }}>
      {proportions.map((item) => (
        <div key={item.country} className={classes["bar-container"]}>
          <div
            className={`${classes.bar} ${item.country === "KOR" ? classes.blue : ""}`}
            style={{
              height: `${(item.proportion / maxProportion) * 100}%`,
            }}
          >
            {item.country === "KOR" && (
              <Image
                src={"/kor.png"}
                alt="태극기"
                className={classes["flag-image"]}
                width={50}
                height={34}
              />
            )}
          </div>
          <span className={classes.label}>{item.country}</span>
        </div>
      ))}
    </div>
  );
}
