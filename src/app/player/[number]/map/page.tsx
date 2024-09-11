"use client";
import styles from "./map.module.css";
import Chart from "./components/chart";
import Timer from "./components/timer";
import InfoBar from "./components/infoBar";
import Alert from "./components/alert";

export default function Home() {
  return (
    <main className={styles.main}>
      <Timer />
      <InfoBar />
      <Chart />
      <Alert />
    </main>
  );
}
