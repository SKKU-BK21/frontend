import { useEffect, useState } from "react";
import classes from "./CardList.module.css";
import { Card } from "../Card";
import { useDisclosure } from "@/hook/useDisclosure";
import { DataModal } from "../DataModal";
import { baseUrl } from "@/constants/baseUrl";
import TopFilter from "../TopFilter/TopFilter";

type Rating = {
  year: number;
  grade: "FIRST" | "SECOND";
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
  setIsExcellentChecked?: (value: boolean) => void;
  setIsGoodChecked?: (value: boolean) => void;
  setCategoryChecked?: (value: string[]) => void;
  setStartYear?: (value: number) => void;
  setEndYear?: (value: number) => void;
  country: string;
  setCountry?: (value: string) => void;
}

export function CardList({
  isExcellentChecked,
  isGoodChecked,
  categoryChecked,
  startYear = 2015,
  endYear = 2025,
  setIsExcellentChecked,
  setIsGoodChecked,
  setCategoryChecked,
  setStartYear,
  setEndYear,
  country,
  setCountry,
}: CardListProps) {
  const [data, setData] = useState<Conference[]>([]);
  const [pageData, setPageData] = useState<Page>();
  const [conferenceId, setConferenceId] = useState(0);
  const [sortBy, setSortBy] = useState("percentage");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { open, setOpen, close } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      const categoryParams = (
        categoryChecked.length == 1 ? [...categoryChecked, ...categoryChecked] : categoryChecked
      )
        .map((category) => `category=${encodeURIComponent(category)}`)
        .join("&");

      const response = await fetch(
        baseUrl +
          `/conferences?sort=${sortBy}&fromyear=${startYear}&toyear=${endYear}&pageSize=${PAGE_SIZE}&pageNumber=${page}&grade=${
            isExcellentChecked ? "FIRST" : isGoodChecked ? "SECOND" : ""
          }&${categoryParams}&country=${country}`
      );
      console.log(
        baseUrl +
          `/conferences?sort=${sortBy}&fromyear=${startYear}&toyear=${endYear}&pageSize=${PAGE_SIZE}&pageNumber=${page}&grade=${
            isExcellentChecked ? "FIRST" : isGoodChecked ? "SECOND" : ""
          }&${categoryParams}&country=${country}`
      );
      // const response2 = await fetch(
      //   baseUrl +
      //     `/conferences?sort=${sortBy}&fromyear=${startYear}&toyear=${endYear}&pageSize=${PAGE_SIZE}&pageNumber=${page}&grade=${
      //       isGoodChecked ? "SECOND" : ""
      //     }&${categoryParams}&country=${country}`
      // );
      // console.log(response, response2);
      // const jsonResponse = (await { ...response, ...response2 }.json()) as Page;
      const jsonResponse = (await response.json()) as Page;
      // const jsonResponse2 = (await response2.json()) as Page;
      setData(jsonResponse.data);
      setPageData(jsonResponse);
      // console.log(jsonResponse);
    };

    fetchData();
  }, [
    categoryChecked,
    country,
    endYear,
    isExcellentChecked,
    isGoodChecked,
    page,
    sortBy,
    startYear,
  ]);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className={classes.root}>
      <TopFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        isExcellentChecked={isExcellentChecked}
        isGoodChecked={isGoodChecked}
        categoryChecked={categoryChecked}
        startYear={startYear}
        endYear={endYear}
        setIsExcellentChecked={setIsExcellentChecked ? setIsExcellentChecked : () => {}}
        setIsGoodChecked={setIsGoodChecked ? setIsGoodChecked : () => {}}
        setCategoryChecked={setCategoryChecked ? setCategoryChecked : () => {}}
        setStartYear={setStartYear ? setStartYear : () => {}}
        setEndYear={setEndYear ? setEndYear : () => {}}
      />
      <div className={classes.row}>
        {data && data.length > 0 ? (
          data.map((conference, index) => {
            return (
              <div key={index} className={classes.column}>
                <Card
                  item={conference}
                  onClick={() => {
                    setConferenceId(conference.id);
                    setOpen(true);
                  }}
                  country={country}
                />
              </div>
            );
          })
        ) : (
          <div className={classes.noDataMessage}>No Conferences Found. </div>
        )}
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
        {pageData &&
          Array.from({ length: pageData.totalPages }, (_, index) => (
            <div
              key={index}
              className={`${classes["pagination-item"]} ${
                page === index + 1 ? classes["active"] : ""
              }`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        / {pageData ? pageData.totalPages : 0}
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
