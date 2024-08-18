"use client";
import styles from "./map.module.css";
import Chart from "./components/chart";
import Timer from "./components/timer";
import InfoBar from "./components/infoBar";
import Alert from "./components/alert";

interface PlayerParams {
  number: string;
}

export default function Home({ params }: { params: PlayerParams }) {
  const number = Number(params.number);
  console.log(number);
  console.log(params.number);
  if (isNaN(number) || number < 0)
    return <div>Number needs to be a number greater than 0</div>;

  return (
    <main className={styles.main}>
      <Timer />
      <InfoBar num={number} />
      <Chart num={number} />
      <Alert />
    </main>
  );
}
