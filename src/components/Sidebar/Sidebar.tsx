"use client";
import classes from "./Sidebar.module.css";

export function Sidebar({
  isExcellentChecked,
  setIsExcellentChecked,
  isGoodChecked,
  setIsGoodChecked,
  categoryChecked,
  setCategoryChecked,
  startYear,
  setStartYear,
  endYear,
  setEndYear,
}: any) {
  const handleYear = async () => {
    if (isNaN(Number(startYear)) || isNaN(Number(startYear)))
      alert("검색 시작연도 및 종료연도는 숫자로 입력해주세요.");
    if (Number(endYear) < Number(startYear))
      alert("검색 시작연도는 종료연도보다 작게 설정되어야 합니다.");
    const startY = Number(startYear);
    const endY = Number(endYear);
    console.log(startY);
    console.log(endY);
  };

  interface CategoryData {
    [key: string]: string;
  }

  const categoryData: CategoryData = {
    TOTAL: "전체",
    AIML: "AI / ML",
    ARCH: "컴퓨터 구조",
    INFOSEC: "정보보안",
    NET: "네트워크",
    SYSDB: "시스템 / 데이터베이스",
    COMTH: "컴퓨팅 이론",
  };

  return (
    <div className={classes.root}>
      <div className={classes.categoryContainer}>
        <div className={classes.categoryTitle}>
          <h3>등급</h3>
        </div>
        <div>
          <input
            className={classes.ratingInput}
            onChange={(e) => setIsExcellentChecked(e.target.checked)}
            type="checkbox"
            id="excellent"
            checked={isExcellentChecked}
          />
          <label className={classes.ratingLabel} htmlFor="excellent">
            최우수
          </label>
        </div>
        <div>
          <input
            className={classes.ratingInput}
            onChange={(e) => setIsGoodChecked(e.target.checked)}
            type="checkbox"
            id="good"
            checked={isGoodChecked}
          />
          <label className={classes.ratingLabel} htmlFor="good">
            우수
          </label>
        </div>
      </div>
      <div className={classes.categoryContainer}>
        <div className={classes.categoryTitle}>
          <h3>카테고리</h3>
        </div>
        {Object.keys(categoryData).map((category, index) => {
          return (
            <div key={category} className={classes.categoryItem}>
              <input
                className={classes.categoryInput}
                onChange={(e) => setCategoryChecked(e.target.value)}
                type="radio"
                id={category}
                value={category}
                checked={categoryChecked == category ? true : false}
              />
              <label htmlFor="category"> {categoryData[category]}</label>
            </div>
          );
        })}
      </div>
      <div className={classes.categoryContainer}>
        <div className={classes.categoryTitle}>
          <h3>연도</h3>
        </div>
        <input
          onChange={(e) => setStartYear(e.target.value)}
          className={classes.yearInput}
          type="number"
        />{" "}
        -{" "}
        <input
          onChange={(e) => setEndYear(e.target.value)}
          className={classes.yearInput}
          type="number"
        />
        {/* <button onClick={handleYear} className={classes.yearButton}>검색</button> */}
      </div>
    </div>
  );
}
