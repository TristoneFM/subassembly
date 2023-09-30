
import styles from './page.module.css'
import ProductionTable from './components/ProductionTable'
import Image from 'next/image'
import { Typography } from 'antd'
import Header from './components/Header'
import ShiftButton from './components/ShiftButton'



export default function Home() {
  return (
    <main className={styles.main}>
        <Image src="/TristoneLogo.png" alt="" width={150} height={80} style={{marginBottom:'1%'}}/>
        <Header/>
        <ProductionTable/>
    </main>
  )
}
