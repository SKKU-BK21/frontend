"use client";
import { CardList } from "@/components/CardList";
import { Sidebar } from "@/components/Sidebar";
import classes from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [isExcellentChecked, setIsExcellentChecked] = useState(true);
  const [isGoodChecked, setIsGoodChecked] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState<string[]>([
    "Alg",
    "Arch",
    "Bio",
    "CGI",
    "CV",
    "DB",
    "DM",
    "HPC",
    "ML",
    "NLP",
    "Net",
    "OS",
    "PL",
    "Robot",
    "SE",
    "Sec",
  ]);
  const [startYear, setStartYear] = useState(new Date().getFullYear() - 10);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
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
