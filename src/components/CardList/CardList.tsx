'use client';
import { useState } from "react";
import classes from "./CardList.module.css";
import { Card } from "../Card";

type Rating = {
  year: number;
  grade: "top" | "excellence";
};

type Conference = {
  id: number;
  acronym: string;
  ratings: Rating[];
  proportion: number;
  average: number;
};

type Page = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  data: Conference[];
};

const dummyPage1: Page = {
  pageNumber: 1,
  pageSize: 12,
  totalElements: 36,
  totalPages: 3,
  data: Array.from({ length: 12 }, (_, index) => {
    return {
      id: index,
      acronym: 'SOSP',
      ratings: [{
        year: 2024,
        grade: 'top',
      }],
      proportion: 16.4,
      average: 12.3,
    }
  })
}

const dummyPage2: Page = {
  pageNumber: 2,
  pageSize: 12,
  totalElements: 36,
  totalPages: 3,
  data: Array.from({ length: 12 }, (_, index) => {
    return {
      id: index,
      acronym: 'SECOND',
      ratings: [{
        year: 2023,
        grade: 'excellence',
      }],
      proportion: 12.4,
      average: 13.3,
    }
  })
}

export function CardList() {
  const [data, setData] = useState(dummyPage1.data);

  return (
    <div className={classes.root}>
      <div className={classes.topFilter}>
        <span> 알파벳 순 | </span>
        <span> 논문비율 순 </span>
      </div>
      <div className={classes.row}>
        {
          data.map((conference, index) => {
            return (
              <div key={index} className={classes.column}>
                <Card item={conference} />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}