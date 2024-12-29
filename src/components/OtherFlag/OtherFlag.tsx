import Image from "next/image";

const fileNameLookup: { [key: string]: string } = {
  hk: "hk.png",
  ca: "CA.gif",
  us: "US.gif",
  ch: "CH.gif",
  cn: "CN.gif",
  de: "DE.gif",
  is: "israel.png",
  ne: "ne.png",
  sg: "SG.gif",
  uk: "uk.webp",
  kr: "kor.png",
};

interface OtherFlagProps {
  country: string;
  width: number;
  height: number;
}

export function OtherFlag({ country, width, height }: OtherFlagProps) {
  const flagFileName = fileNameLookup[country] || "hk.png";

  return <Image src={`/flags/${flagFileName}`} alt={country} width={width} height={height} />;
}
