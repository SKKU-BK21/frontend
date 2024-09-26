"use client";

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
  ratings: Rating[];
  proportion: number;
  average: number;
};

type CardProps = {
  item: Conference;
  onClick?: () => void;
};

export function Card({ item, onClick }: CardProps) {
  const deviation = Number((item.proportion - item.average).toFixed(2));

  return (
    <div className={classes.cardContainer} onClick={onClick}>
      <div className={classes.cardTitle}>{item.acronym}</div>
      <div className={`${classes.gap} ${classes.ps}`}>
        {item.ratings.map((rating, index) => (
          <RatingBadge key={index} year={rating.year} rating={rating.grade} />
        ))}
      </div>
      <div className={classes.ratio}>
        <Image
          src={"/kor.png"}
          alt="태극기"
          className={classes["flag-image"]}
          width={72}
          height={48}
          objectFit="contain"
        />
        <div className={classes.proportion}>{`${item.proportion}%`}</div>
      </div>
      <div>
        전체 평균 대비 {Math.abs(deviation)}%{" "}
        {deviation > 0 ? (
          <span className={classes.redArrow}>↑</span>
        ) : (
          <span className={classes.blueArrow}>↓</span>
        )}
      </div>
    </div>
  );
}
