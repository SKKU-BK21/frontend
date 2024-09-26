import Image from "next/image";
import classes from "./Header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <header className={classes.root}>
      <Link href={"/"}>
        <Image src={"/kiise.svg"} alt={""} width={200} height={100} className={classes.logo} />
      </Link>
      <div className={classes.title}>한국정보과학회 학회/논문 통계 서비스</div>
    </header>
  );
}
