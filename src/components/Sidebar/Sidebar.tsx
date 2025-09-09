"use client";

import { OtherFlag } from "../OtherFlag/OtherFlag";
import RangeSlider from "../RangeSlider/RangeSlider";
import classes from "./Sidebar.module.css";
import Link from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export interface CategoryData {
  [key: string]: {
    text: string;
    color: string;
  };
}

export const categoryData: CategoryData = {
  Alg: { text: "Algorithm", color: "firebrick" },
  Arch: { text: "Architecture", color: "royalblue" },
  Bio: { text: "Bio", color: "goldenrod" },
  CGI: { text: "Graphics/Interface", color: "salmon" },
  CV: { text: "Vision", color: "chocolate" },
  DB: { text: "Database", color: "cadetblue" },
  DM: { text: "Data Mining", color: "seagreen" },
  HPC: { text: "HPC", color: "mediumslateblue" },
  ML: { text: "Machine Learning", color: "darkorchid" },
  NLP: { text: "NLP", color: "orangered" },
  Net: { text: "Network", color: "darkturquoise" },
  OS: { text: "Operating System", color: "sienna" },
  PL: { text: "Programming Language", color: "dimgray" },
  Robot: { text: "Robot", color: "chartreuse" },
  SE: { text: "SW Engineering", color: "dodgerblue" },
  Sec: { text: "Security", color: "darkgreen" },
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
          <h3>Rank Types</h3>
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
            🥇 Top Rank
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
            🥈 High Rank
          </label>
        </div>
      </div>
      <div className={classes.filterContainer}>
        <div className={classes.categoryTitle}>
          <h3>Category</h3>
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
      <div className={classes.filterContainer}>
        <div className={classes.toptierTitle}>
          <h3>KIISE CS Conference List</h3>
        </div>
        <Link
          target="_blank"
          href="https://www.kiise.or.kr/TopConferences/data/SW%EB%B6%84%EC%95%BC%EC%9A%B0%EC%88%98%ED%95%99%EC%88%A0%EB%8C%80%ED%9A%8C%EB%AA%A9%EB%A1%9D_2024.pdf"
        >
          <div className={classes.toptierContainer}>
            <OpenInNewIcon fontSize="small" />
            <div>2024 List</div>
          </div>
        </Link>
      </div>
      <div className={classes.filterContainer}>
        <div className={classes.categoryTitle}>
          <h3>Year Range</h3>
        </div>
        <RangeSlider
          startYear={startYear}
          endYear={endYear}
          setStartYear={setStartYear}
          setEndYear={setEndYear}
        />
      </div>
      <div className={classes.filterContainer}>
        <div className={classes.categoryTitle}>
          <h3>Country</h3>
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
  kr: "Korea",
  us: "USA",
  cn: "China",
  ca: "Canada",
  ch: "Swiss",
  de: "Germany",
  il: "Israel",
  hk: "Hongkong",
  // ne: "네덜란드",
  sg: "Singapore",
  uk: "UK",
};
