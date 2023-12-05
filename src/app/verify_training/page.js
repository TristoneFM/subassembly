
import styles from '../page.module.css'

import Image from 'next/image'
import { Typography } from 'antd'
import Header from '../components/Header'
import Training from '../components/training/Training'




export default function Home() {
  return (
    <main className={styles.main}>
        {/* <Image src="/TristoneLogo.png" alt="" width={150} height={80} style={{marginBottom:'1%'}}/>
        <Header text={'Revisar Entrenamientos'}/> */}
        <Training/>

    
    </main>
  )
}
