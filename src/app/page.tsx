"use client";
import { CardList } from "@/components/CardList";
import { Sidebar } from "@/components/Sidebar";
import classes from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [isExcellentChecked, setIsExcellentChecked] = useState(true);
  const [isGoodChecked, setIsGoodChecked] = useState(true);
  const [categoryChecked, setCategoryChecked] = useState<string[]>([
    "AIML",
    "ARCH",
    "INFOSEC",
    "NET",
    "SYSDB",
    "COMTH",
  ]);
  const [startYear, setStartYear] = useState(2014);
  const [endYear, setEndYear] = useState(2024);
  const [country, setCountry] = useState("kr");

  return (
    <main className={classes.root}>
      <Sidebar
        isExcellentChecked={isExcellentChecked}
        setIsExcellentChecked={setIsExcellentChecked}
        isGoodChecked={isGoodChecked}
        setIsGoodChecked={setIsGoodChecked}
        categoryChecked={categoryChecked}
        setCategoryChecked={setCategoryChecked}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
        country={country}
        setCountry={setCountry}
      />
      <CardList
        isExcellentChecked={isExcellentChecked}
        setIsExcellentChecked={setIsExcellentChecked}
        isGoodChecked={isGoodChecked}
        setIsGoodChecked={setIsGoodChecked}
        categoryChecked={categoryChecked}
        setCategoryChecked={setCategoryChecked}
        startYear={startYear}
        setStartYear={setStartYear}
        endYear={endYear}
        setEndYear={setEndYear}
        country={country}
        setCountry={setCountry}
      />
    </main>
  );
}
