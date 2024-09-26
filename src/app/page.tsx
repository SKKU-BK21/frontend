'use client';
import { CardList } from "@/components/CardList";
import { Sidebar } from "@/components/Sidebar";
import classes from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [isExcellentChecked, setIsExcellentChecked] = useState(false);
  const [isGoodChecked, setIsGoodChecked] = useState(false);
  const [categoryChecked, setCategoryChecked] = useState('total');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

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
      />
      <CardList 
        isExcellentChecked={isExcellentChecked}
        isGoodChecked={isGoodChecked}
        categoryChecked={categoryChecked}
        startYear={startYear}
        endYear={endYear}
      />
    </main>
  );
}
