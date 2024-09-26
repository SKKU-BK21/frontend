import { useEffect, useState } from "react";
import classes from "./CardList.module.css";
import { Card } from "../Card";
import { useDisclosure } from "@/hook/useDisclosure";
import { DataModal } from "../DataModal";

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
      acronym: "SOSP",
      ratings: [
        {
          year: 2024,
          grade: "top",
        },
      ],
      proportion: 16.4,
      average: 12.3,
    };
  }),
};

const dummyPage2: Page = {
  pageNumber: 2,
  pageSize: 12,
  totalElements: 36,
  totalPages: 3,
  data: Array.from({ length: 12 }, (_, index) => {
    return {
      id: index,
      acronym: "SECOND",
      ratings: [
        {
          year: 2023,
          grade: "excellence",
        },
      ],
      proportion: 12.4,
      average: 13.3,
    };
  }),
};

export function CardList({
  isExcellentChecked,
  isGoodChecked,
  categoryChecked,
  startYear,
  endYear,
}: any) {
  const [data, setData] = useState(dummyPage1.data);
  const [conferenceId, setConferenceId] = useState(0);
  const [isAlphabeticalOrder, setIsAlphabeticalOrder] = useState(false);
  const [isRatioOrder, setIsRatioOrder] = useState(false);
  const { open, setOpen, close } = useDisclosure();

  useEffect(() => {
    const updatedData = dummyPage1.data
    const filteredData = updatedData
      .filter((conference) => isExcellentChecked ? conference.ratings.some((rating)=>rating.grade=="top") : true)
      .filter((conference) => isGoodChecked ? conference.ratings.some((rating)=>rating.grade=="excellence") : true)
      //.filter((conference) => conference.category == categoryChecked )
      .filter((conference) => startYear ? conference.ratings.some((rating)=>rating.year >= startYear) : true)
      .filter((conference) => endYear ? conference.ratings.some((rating)=>rating.year <= endYear) : true)
      .sort((a, b) => a.acronym.localeCompare(b.acronym, undefined, {sensitivity: 'base'}))
      .sort((a, b) => a.proportion - b.proportion)
    setData(filteredData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isExcellentChecked,
    isGoodChecked,
    categoryChecked,
    startYear,
    endYear,
    isAlphabeticalOrder,
    isRatioOrder
  ])

  return (
    <div className={classes.root}>
      <div className={classes.topFilter}>
        <span onClick={() => {setIsAlphabeticalOrder(true); setIsRatioOrder(false)}}> 알파벳 순 | </span>
        <span onClick={() => {setIsRatioOrder(true); setIsAlphabeticalOrder(false)}}> 논문비율 순 </span>
      </div>
      <div className={classes.row}>
        {data.length ? data.map((conference, index) => {
          return (
            <div key={index} className={classes.column}>
              <Card
                item={conference}
                onClick={() => {
                  setConferenceId(conference.id);
                  setOpen(true);
                }}
              />
            </div>
          );
        }) : "조회된 컨퍼런스가 없습니다."}
        <DataModal open={open} onClose={close} conferenceId={conferenceId} withCloseButton />
      </div>
    </div>
  );
}
