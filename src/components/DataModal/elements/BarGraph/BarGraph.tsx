import { Proportion } from "@/types/conferences";
import classes from "./BarGraph.module.css";
import Image from "next/image";
import { countryToName } from "@/constants/country";
import { Flag } from "@/components/Flag/Flag";
import { OtherFlag } from "@/components/OtherFlag/OtherFlag";

export interface IBarGraphProps {
  proportions: Proportion[];
  height?: number;
  country?: string;
}

export function BarGraph({ proportions, height, country }: IBarGraphProps) {
  const maxProportion = proportions ? Math.max(...proportions.map((item) => item.proportion)) : 0;

  proportions?.sort((a, b) => {
    if (a.country == "unknown") return 1;
    if (b.country == "unknown") return -1;
    return b.proportion - a.proportion;
  });
  return (
    <div className={classes["bar-chart-container"]} style={{ height: height, paddingTop: "40px" }}>
      {proportions?.map((item) => (
        <div key={item.country} className={classes["bar-container"]}>
          <div
            className={`${classes.bar} ${item.country === country ? classes.blue : ""}`}
            style={{
              height: `${(item.proportion / maxProportion) * 150}%`,
            }}
          >
            <div className={classes["flag-image"]}>
              {item.country === country &&
                (item.country === "kr" ? (
                  <Flag width={50} />
                ) : (
                  <OtherFlag country={item.country} width={50} height={33.3} />
                ))}
            </div>
          </div>
          <span className={classes.label}>
            {item.country == null ? "미분류" : countryToName[item.country]}
          </span>
        </div>
      ))}
    </div>
  );
}
