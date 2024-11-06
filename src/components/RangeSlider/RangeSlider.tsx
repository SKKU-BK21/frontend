import React, { useRef, useEffect, useState } from "react";
import classes from "./RangeSlider.module.css";

interface RangeSliderProps {
  startYear: number;
  endYear: number;
  setStartYear: (year: number) => void;
  setEndYear: (year: number) => void;
}

function RangeSlider({ startYear, endYear, setStartYear, setEndYear }: RangeSliderProps) {
  const fixedMinYear = 2014;
  const fixedMaxYear = 2024;
  const YearGap = 0;

  const [rangeMinValue, setRangeMinValue] = useState(fixedMinYear);
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxYear);
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

  const yearRangeMinValueHandler = (e: { target: { value: string } }) => {
    setRangeMinValue(parseInt(e.target.value));
  };

  const yearRangeMaxValueHandler = (e: { target: { value: string } }) => {
    setRangeMaxValue(parseInt(e.target.value));
  };

  const twoRangeHandler = () => {
    if (rangeMaxValue - rangeMinValue < YearGap) {
      setRangeMaxValue(rangeMinValue + YearGap);
      setRangeMinValue(rangeMaxValue - YearGap);
    }
  };

  const calculatePercentages = () => {
    const minPercent = ((startYear - fixedMinYear) / (fixedMaxYear - fixedMinYear)) * 100;
    const maxPercent = 100 - ((endYear - fixedMinYear) / (fixedMaxYear - fixedMinYear)) * 100;
    setRangeMinPercent(minPercent);
    setRangeMaxPercent(maxPercent);
  };

  useEffect(() => {
    calculatePercentages();
  }, [startYear, endYear]);

  return (
    <>
      <div className={classes.slide}>
        <div
          className={classes.slideInner}
          style={{ left: `${rangeMinPercent}%`, right: `${rangeMaxPercent}%` }}
        ></div>
      </div>
      <div className={classes.wrapper}>
        <input
          type="range"
          className={classes.range}
          min={fixedMinYear}
          max={fixedMaxYear - YearGap}
          step={1}
          value={startYear}
          onChange={(e) => {
            setStartYear(parseInt(e.target.value));
            yearRangeMinValueHandler(e);
            twoRangeHandler();
          }}
        />
        <div className={classes.thumbContainer} style={{ left: `${rangeMinPercent}%` }}>
          <div className={classes.thumbLabel}>{startYear}</div>
        </div>
        <input
          type="range"
          className={classes.range}
          min={fixedMinYear + YearGap}
          max={fixedMaxYear}
          step={1}
          value={endYear}
          onChange={(e) => {
            setEndYear(parseInt(e.target.value));
            yearRangeMaxValueHandler(e);
            twoRangeHandler();
          }}
        />
        <div className={classes.thumbContainer} style={{ left: `${100 - rangeMaxPercent}%` }}>
          <div className={classes.thumbLabel}>{endYear}</div>
        </div>
      </div>
    </>
  );
}

export default RangeSlider;
