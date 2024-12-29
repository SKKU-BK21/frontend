"use client";

import { OtherFlag } from "../OtherFlag/OtherFlag";
import RangeSlider from "../RangeSlider/RangeSlider";
import classes from "./Sidebar.module.css";

export interface CategoryData {
  [key: string]: {
    text: string;
    color: string;
  };
}
export const categoryData: CategoryData = {
  AIML: { text: "🧠 AI / ML", color: "lightpurple" },
  ARCH: { text: "🖥️ 컴퓨터 구조", color: "lightblue" },
  INFOSEC: { text: "🔒 정보보안", color: "lightgreen" },
  NET: { text: "🌐 네트워크", color: "orange" },
  SYSDB: { text: "🏠 시스템 / 데이터베이스", color: "brown" },
  COMTH: { text: "🎓 컴퓨팅 이론", color: "lightred" },
};

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
  country,
  setCountry,
}: any) {
  return (
    <div className={classes.root}>
      <div className={classes.filterContainer}>
        <div className={classes.categoryTitle}>
          <h3>학회 등급</h3>
        </div>
        <div
          className={`${classes.checkboxItem} ${classes.red}`}
          onClick={() => setIsExcellentChecked(!isExcellentChecked)}
        >
          <input
            className={classes.ratingInput}
            onChange={(e) => setIsExcellentChecked(e.target.checked)}
            type="checkbox"
            id="excellent"
            checked={isExcellentChecked}
          />
          <label
            className={classes.ratingLabel}
            onClick={() => setIsExcellentChecked(!isExcellentChecked)}
          >
            🥇 최우수
          </label>
        </div>
        <div
          className={`${classes.checkboxItem} ${classes.blue}`}
          onClick={() => setIsGoodChecked(!isGoodChecked)}
        >
          <input
            className={classes.ratingInput}
            onChange={(e) => setIsGoodChecked(e.target.checked)}
            type="checkbox"
            id="good"
            checked={isGoodChecked}
          />
          <label className={classes.ratingLabel} onClick={() => setIsGoodChecked(!isGoodChecked)}>
            🥈 우수
          </label>
        </div>
      </div>
      <div className={classes.filterContainer}>
        <div className={classes.categoryTitle}>
          <h3>카테고리</h3>
        </div>
        {Object.keys(categoryData).map((category) => {
          return (
            <div
              key={category}
              className={`${classes.checkboxItem} ${classes[categoryData[category].color]}`}
              onClick={() => {
                if (categoryChecked.includes(category)) {
                  setCategoryChecked(categoryChecked.filter((item: string) => item !== category));
                } else {
                  setCategoryChecked([...categoryChecked, category]);
                }
              }}
            >
              <input
                className={classes.categoryInput}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCategoryChecked([...categoryChecked, e.target.value]);
                  } else {
                    setCategoryChecked(
                      categoryChecked.filter((item: string) => item !== e.target.value)
                    );
                  }
                }}
                type="checkbox"
                id={category}
                value={category}
                checked={categoryChecked.includes(category) ? true : false}
              />
              <label className={classes.categoryText}>{categoryData[category].text}</label>
            </div>
          );
        })}
      </div>
      <div className={classes.filterContainer} style={{ paddingBottom: "50px" }}>
        <div className={classes.categoryTitle}>
          <h3>연도</h3>
        </div>
        <RangeSlider
          startYear={startYear}
          endYear={endYear}
          setStartYear={setStartYear}
          setEndYear={setEndYear}
        />
      </div>
      <div className={classes.filterContainer} style={{ paddingBottom: "50px" }}>
        <div className={classes.categoryTitle}>
          <h3>국가</h3>
        </div>
        {Object.keys(countryData).map((countryKey) => {
          return (
            <div
              key={countryKey}
              className={`${classes.checkboxItem} `}
              onClick={() => {
                setCountry(countryKey);
              }}
            >
              <OtherFlag country={countryKey} width={14} height={10} />
              <input
                className={classes.categoryInput}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                type="radio"
                id={countryKey}
                value={countryKey}
                checked={countryKey === country}
              />
              <label className={classes.categoryText}>{countryData[countryKey]}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const countryData: { [key: string]: string } = {
  kr: "한국",
  us: "미국",
  cn: "중국",
  ca: "캐나다",
  ch: "스위스",
  de: "독일",
  il: "이스라엘",
  hk: "홍콩",
  ne: "네덜란드",
  sg: "싱가포르",
  uk: "영국",
};
