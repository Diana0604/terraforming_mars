"use client"
import styles from './page.module.css'
import Chart from './map/chart';
import Timer from './map/timer';
import InfoBar from './map/infoBar';


export default function Home() {


  return (
    <main className={styles.main}>
      <Timer/>
      <InfoBar/>
      <Chart />
    </main>
  )
}
