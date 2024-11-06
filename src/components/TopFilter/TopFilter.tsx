import { categoryData } from "../Sidebar/Sidebar";
import classes from "./TopFilter.module.css";

interface TopFilterProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  isExcellentChecked: boolean;
  isGoodChecked: boolean;
  categoryChecked: string[];
  startYear: number;
  endYear: number;
  setIsExcellentChecked: (value: boolean) => void;
  setIsGoodChecked: (value: boolean) => void;
  setCategoryChecked: (value: string[]) => void;
  setStartYear: (value: number) => void;
  setEndYear: (value: number) => void;
}

export default function TopFilter({
  sortBy,
  setSortBy,
  isExcellentChecked,
  isGoodChecked,
  categoryChecked,
  startYear,
  endYear,
  setIsExcellentChecked,
  setIsGoodChecked,
  setCategoryChecked,
  setStartYear,
  setEndYear,
}: TopFilterProps) {
  const handleChipClick = (chipType: string, value?: string) => {
    switch (chipType) {
      case "excellent":
        setIsExcellentChecked(false);
        break;
      case "good":
        setIsGoodChecked(false);
        break;
      case "category":
        if (value) {
          setCategoryChecked(categoryChecked.filter((category) => category !== value));
        }
        break;
      default:
        break;
    }
  };

  const handleClearAll = () => {
    setIsExcellentChecked(false);
    setIsGoodChecked(false);
    setCategoryChecked([]);
  };

  return (
    <div className={classes.topFilter}>
      <div className={classes.statusContainer}>
        <div className={classes.allClear} onClick={() => handleClearAll()}>
          전체 해제
          <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512">
            <path
              fill="#6c757d"
              d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
            />
          </svg>
        </div>
        <div className={classes.divider}>|</div>
        {isExcellentChecked && (
          <div
            className={`${classes.chip} ${classes.red}`}
            onClick={() => handleChipClick("excellent")}
          >
            최우수
            <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
        )}
        {isGoodChecked && (
          <div
            className={`${classes.chip} ${classes.blue}`}
            onClick={() => handleChipClick("good")}
          >
            우수
            <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
        )}
        {categoryChecked.map((category) => (
          <div
            key={category}
            className={`${classes.chip} ${classes[categoryData[category].color]}`}
            onClick={() => handleChipClick("category", category)}
          >
            {categoryData[category].text}
            <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
        ))}
      </div>

      <div className={classes.sort}>
        <span
          onClick={() => {
            setSortBy("percentage");
          }}
          className={`${classes.sortText} ${sortBy === "percentage" ? classes.sortActive : ""}`}
        >
          논문비율 순
        </span>
        <span className={classes.divider}>|</span>
        <span
          onClick={() => {
            setSortBy("alphabet");
          }}
          className={`${classes.sortText} ${sortBy === "alphabet" ? classes.sortActive : ""}`}
        >
          알파벳 순
        </span>
      </div>
    </div>
  );
}
