import { useEffect, useState } from "react";
import classes from "./CardList.module.css";
import { Card } from "../Card";
import { useDisclosure } from "@/hook/useDisclosure";
import { DataModal } from "../DataModal";
import { baseUrl } from "@/constants/baseUrl";

type Rating = {
  year: number;
  grade: "FIRST" | "SECOND";
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

interface CardListProps {
  isExcellentChecked: boolean;
  isGoodChecked: boolean;
  categoryChecked: string[];
  startYear?: number;
  endYear?: number;
}

export function CardList({
  isExcellentChecked,
  isGoodChecked,
  categoryChecked,
  startYear = 2014,
  endYear = 2024,
}: CardListProps) {
  const [data, setData] = useState<Conference[]>([]);
  const [conferenceId, setConferenceId] = useState(0);
  const [sortBy, setSortBy] = useState("alphabet");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { open, setOpen, close } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      const categoryParams = categoryChecked
        .map((category) => `category=${encodeURIComponent(category)}`)
        .join("&");
      const response = await fetch(
        baseUrl +
          `/conferences?sort=${sortBy}&fromyear=${startYear}&toyear=${endYear}&pageSize=${PAGE_SIZE}&pageNumber=${page}&grade=${
            isExcellentChecked ? "FIRST" : isGoodChecked ? "SECOND" : ""
          }&${categoryParams}`
      );
      const jsonResponse = (await response.json()) as Page;
      setData(jsonResponse.data);
    };

    fetchData();
  }, [categoryChecked, endYear, isExcellentChecked, isGoodChecked, page, sortBy, startYear]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={classes.root}>
      <div className={classes.topFilter}>
        <span
          onClick={() => {
            setSortBy("alphabet");
          }}
        >
          {" "}
          알파벳 순 |{" "}
        </span>
        <span
          onClick={() => {
            setSortBy("percentage");
          }}
        >
          {" "}
          논문비율 순{" "}
        </span>
      </div>
      <div className={classes.row}>
        {data && data.length > 0 ?
          data.map((conference, index) => {
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
          }) : <div className={classes.noDataMessage}>조회된 컨퍼런스가 없습니다.</div>}
        <DataModal open={open} onClose={close} conferenceId={conferenceId} withCloseButton />
      </div>
      <div className={classes.pagination}>
        <svg
          onClick={handlePreviousPage}
          className={`${classes["pagination-icon"]} ${page === 1 ? classes["disabled"] : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24px"
          height="24px"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        <span>{page}</span>
        <svg
          onClick={handleNextPage}
          className={classes["pagination-icon"]}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24px"
          height="24px"
        >
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </div>
    </div>
  );
}

const PAGE_SIZE = 16;
