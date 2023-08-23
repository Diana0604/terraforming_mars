"use client"
import styles from './page.module.css'
import Chart from './map/chart';
import Timer from './map/timer';
import InfoBar from './map/infoBar';
import Alert from './map/alert'


export default function Home() {


  return (
    <main className={styles.main}>
      <Timer/>
      <InfoBar/>
      <Chart />
      <Alert/>
    </main>
  )
}
