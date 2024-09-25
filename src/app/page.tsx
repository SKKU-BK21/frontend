import { CardList } from "@/components/CardList";
import { Sidebar } from "@/components/Sidebar";
import classes from "./page.module.css";

export default function Home() {
  return (
    <main className={classes.root}>
      <Sidebar />
      <CardList />
    </main>
  );
}
