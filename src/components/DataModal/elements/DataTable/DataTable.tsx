import React, { useEffect, useState } from "react";
import classes from "./DataTable.module.css";
import { PagedApiResponse } from "@/types/common";
import { Publication } from "@/types/conferences";

export interface IDataTableProps {
  id: number;
  render: boolean;
}

export function DataTable({ id, render }: IDataTableProps) {
  const [columns, setColumns] = useState([
    { id: 1, width: 50 },
    { id: 2, width: 300 },
    { id: 3, width: 100 },
    { id: 4, width: 100 },
    { id: 5, width: 70 },
  ]);
  const [data, setData] = useState<Publication[]>();

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/conferences/${id}/publications`);
      const jsonResponse = (await response.json()) as PagedApiResponse<Publication>;

      setData(jsonResponse.data);
    };
    if (render) {
      fetchData();
    }
  }, [id, render]);

  return (
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
        {data?.map((publication) => (
          <tr key={publication.id}>
            {DATA_TABLE_FIELDS.map((field, index) => (
              <td key={field} style={{ width: `${columns[index].width}%` }}>
                {publication[field as keyof Publication]}
              </td>
            ))}
          </tr>
        ))}
        <tr></tr>
      </tbody>
    </table>
  );
}

const DATA_TABLE_HEADER = ["순번", "논문 제목", "저자", "출판년도", "인용수"];
const DATA_TABLE_FIELDS = ["id", "title", "authors", "publicationYear", "citationCount"];
const MIN_WIDTH = 50;
