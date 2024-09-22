import classes from "./DataTablePagination.module.css";

export interface IDataTablePaginationProps {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalPages?: number;
}

export function DataTablePagination({
  pageNumber,
  setPageNumber,
  totalPages,
}: IDataTablePaginationProps) {
  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, totalPages || 1));
  };

  return (
    <div className={classes["pagination"]}>
      <svg
        onClick={handlePreviousPage}
        className={`${classes["pagination-icon"]} ${pageNumber === 1 ? classes["disabled"] : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20px"
        height="20px"
      >
        <path d="M0.292915 7.29289C-0.097609 7.68342 -0.097609 8.31658 0.292915 8.70711L6.65688 15.0711C7.0474 15.4616 7.68057 15.4616 8.07109 15.0711C8.46161 14.6805 8.46161 14.0474 8.07109 13.6569L2.41424 8L8.07109 2.34315C8.46161 1.95262 8.46161 1.31946 8.07109 0.928932C7.68057 0.538408 7.0474 0.538408 6.65688 0.928932L0.292915 7.29289ZM1.00012 7H1.00002L1.00002 9H1.00012L1.00012 7Z" />
      </svg>
      <svg
        onClick={handleNextPage}
        className={`${classes["pagination-icon"]} ${
          pageNumber === totalPages ? classes["disabled"] : ""
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="20px"
        height="20px"
      >
        <path d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928933 0.928932C0.538409 1.31946 0.538409 1.95262 0.928933 2.34315L6.58579 8L0.928933 13.6569C0.538409 14.0474 0.538409 14.6805 0.928933 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM7.9999 9H8V7H7.9999V9Z" />
      </svg>
    </div>
  );
}
