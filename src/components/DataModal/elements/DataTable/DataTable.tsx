import React, { useEffect, useState } from "react";
import classes from "./DataTable.module.css";
import { PagedApiResponse } from "@/types/common";
import { Publication } from "@/types/conferences";
import { DataTablePagination } from "./DataTablePagination";
import { baseUrl } from "@/constants/baseUrl";

export interface IDataTableProps {
  id: number;
  render: boolean;
  fromYear?: number;
  toYear?: number;
}

export function DataTable({ id, render, fromYear, toYear }: IDataTableProps) {
  const [columns, setColumns] = useState([
    { id: 1, width: 50 },
    { id: 2, width: 300 },
    { id: 3, width: 100 },
    { id: 4, width: 100 },
    // { id: 5, width: 70 },
  ]);
  const [data, setData] = useState<Publication[]>();
  const [pageData, setPageData] = useState<PagedApiResponse<{}>>();
  const [sortCriteria, setSortCriteria] = useState("alphabet");
  const [pageNumber, setPageNumber] = useState(1);

  const handleMouseDown = (index: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const startX = event.clientX;
    const startWidth = columns[index].width;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(MIN_WIDTH, startWidth + moveEvent.clientX - startX);
      setColumns((prevColumns) =>
        prevColumns.map((col, i) => (i === index ? { ...col, width: newWidth } : col))
      );
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
  };

  useEffect(() => {
    const fetchData = async () => {
      let url =
        baseUrl +
        `/conferences/${id}/publications?sort=${sortCriteria}&pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`;
      if (fromYear) {
        url += `&fromyear=${fromYear}`;
      }
      if (toYear) {
        url += `&toyear=${toYear}`;
      }

      const response = await fetch(url);
      const jsonResponse = (await response.json()) as PagedApiResponse<Publication>;

      setData(jsonResponse.data);
      setPageData(jsonResponse);
    };
    if (render) {
      fetchData();
    }
  }, [fromYear, id, pageNumber, render, sortCriteria, toYear]);

  return (
    <>
      <div className={classes["sort-container"]}>
        <span>정렬 기준</span>
        <span
          className={`${classes["sort-select"]} ${
            sortCriteria === "alphabet" ? classes["active"] : ""
          }`}
          onClick={() => handleSortChange("alphabet")}
        >
          알파벳 순
        </span>
        <span
          className={`${classes["sort-select"]} ${
            sortCriteria === "year" ? classes["active"] : ""
          }`}
          onClick={() => handleSortChange("year")}
        >
          출판년도 순
        </span>
        {/* <span
          className={`${classes["sort-select"]} ${
            sortCriteria === "cite" ? classes["active"] : ""
          }`}
          onClick={() => handleSortChange("cite")}
        >
          인용수 순
        </span> */}
      </div>
      <table className={classes["resizable-table"]}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column.id} style={{ width: `${column.width}%` }}>
                {DATA_TABLE_HEADER[index]}
                <div
                  className={classes["resize-handle"]}
                  onMouseDown={(e) => handleMouseDown(index, e)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((publication, pidx) => (
            <tr key={publication.id}>
              {DATA_TABLE_FIELDS.map((field, index) => (
                <td key={field} style={{ width: `${columns[index].width}%` }}>
                  {field === "id" ? (
                    <p>{pidx + 1 + (pageNumber - 1) * Number(PAGE_SIZE)}</p>
                  ) : (
                    <p>{publication[field as keyof Publication]}</p>
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      <DataTablePagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={pageData?.totalPages}
      />
    </>
  );
}

// const DATA_TABLE_HEADER = ["순번", "논문 제목", "저자", "출판년도", "인용수"];
const DATA_TABLE_HEADER = ["순번", "논문 제목", "저자", "출판년도"];
// const DATA_TABLE_FIELDS = ["id", "title", "authors", "publicationYear", "citationCount"];
const DATA_TABLE_FIELDS = ["id", "title", "authors", "publicationYear"];
const MIN_WIDTH = 50;
const PAGE_SIZE = 5;
