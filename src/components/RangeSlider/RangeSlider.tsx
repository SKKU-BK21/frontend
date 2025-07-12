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
  const fixedMaxYear = new Date().getFullYear();
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
      <div className={classes.wrapper}>
        <input 
          className={classes.number}
          type="number"
          min={fixedMinYear}
          max={fixedMaxYear - YearGap}
          value={startYear}
          step={1}
          onChange={(e) => {            
            const newStartYear = parseInt(e.target.value);
            if (newStartYear <= endYear) {
              setStartYear(newStartYear);
            }
          }}
          >
        </input>
        <p style={{position: "static", display: "inline-block", paddingInline: "10px"}}>-</p>
        <input 
          className={classes.number}
          type="number"
          min={fixedMinYear}
          max={fixedMaxYear - YearGap}
          value={endYear}
          step={1}
          onChange={(e) => {
            const newEndYear = parseInt(e.target.value);
            if (newEndYear >= startYear) {
              setEndYear(newEndYear);
            }
          }}
          >
        </input>
      </div>
      
    </>
  );
}

export default RangeSlider;
