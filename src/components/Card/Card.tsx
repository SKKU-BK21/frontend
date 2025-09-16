"use client";

import { CategoryBadge } from "../CategoryBadge";
import { Flag } from "../Flag/Flag";
import { OtherFlag } from "../OtherFlag/OtherFlag";
import { RatingBadge } from "../RatingBadge";
import classes from "./Card.module.css";
import Image from "next/image";

type Rating = {
  year: number;
  grade: string;
};

type Conference = {
  id: number;
  acronym: string;
  category: string;
  ratings: Rating[];
  filterPublicationCount: number;
  filterPublicationProportion: number;
  koreaPublicationCount: number;
  koreaPublicationProportion: number;
  totalPublicationCount: number;
  average: number;
};

type CardProps = {
  item: Conference;
  onClick?: () => void;
  country: string;
};

export function Card({ item, onClick, country }: CardProps) {
  return (
    <div className={classes.cardContainer} onClick={onClick}>
      <div className={classes.cardTitle}>{item.acronym}</div>
      <div className={`${classes.gap} ${classes.ps}`}>
        {item.ratings.map((rating, index) => (
          <RatingBadge key={index} year={rating.year} rating={rating.grade} />
        ))}
      </div>
      <div className={classes.pbs}>
        <CategoryBadge category={item.category} color="black"/>
      </div>
      <div className={classes.ratio}>
        {country === "kr" ? (
          <Flag width={72} />
        ) : (
          <OtherFlag country={country} width={72} height={48} />
        )}
        <div className={classes.proportion}>{`${item.filterPublicationProportion}%`}</div>
      </div>
      <div className={classes.compare}>
        Number of Papers/Total
        <span className={classes.compareValue}>
          {item.filterPublicationCount}/{item.totalPublicationCount}
        </span>
      </div>
    </div>
  );
}
