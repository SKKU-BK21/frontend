import Image from "next/image";
import classes from "./Header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <header className={classes.root}>
      <Link href={"/"}>
        <Image src={"/kiise.svg"} alt={""} width={200} height={100} className={classes.logo} />
      </Link>
      <div className={classes.title}>
      KIISE CS Top Conference World Ranking <br />
      한국정보과학회 우수학술대회 목록 국가별 통계</div>
    </header>
  );
}
