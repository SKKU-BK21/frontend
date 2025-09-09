import Link from "next/link";
import Image from "next/image";
import classes from "./Footer.module.css";
import { FOOTER_INFO } from "./constants";

export function Footer() {
  return (
    <footer className={classes.root}>
      <div className={classes.wrapper}>
        <Link href={"https://www.kiise.or.kr"} target="_blank">
          <Image className={classes.image} src={"/kiise.svg"} alt={""} width={200} height={100} />
        </Link>
        <div className={classes.info}>
          {FOOTER_INFO.map((info, index) => (
            <div key={index}>
              {Object.keys(info)[0] === ""
                ? `${Object.values(info)[0]}`
                : `${Object.keys(info)[0]} : ${Object.values(info)[0]}`}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
