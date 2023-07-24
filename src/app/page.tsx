import Image from 'next/image'
import styles from './page.module.css'
import Chart from './chart';
import map from "./bareMap.png";


export default function Home() {


  return (
    <main className={styles.main}>
      {/* <Image className={styles.img} src={map}  alt="mars map"/> */}
      <Chart />
    </main>
  )
}
