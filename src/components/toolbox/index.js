import React from 'react'
import styles from "./index.module.css"
import { COLORS } from '../constant'

const Toolbox = () => {
    const updateBrush=(e)=>{
       
    }
  return (
    <div className={styles.toolbox}>
        <div className={styles.toolitem}>
            <h4 className={styles.tooltext}>Stroke Color</h4>
            <div className={styles.itemContainer}>
                <div className={styles.colorBox} style={{backgroundColor: COLORS.BLACK}}/>
                <div className={styles.colorBox} style={{backgroundColor: COLORS.RED}}/>
                <div className={styles.colorBox} style={{backgroundColor: COLORS.GREEN}}/>
                <div className={styles.colorBox} style={{backgroundColor: COLORS.BLUE}}/>
                <div className={styles.colorBox} style={{backgroundColor: COLORS.ORANGE}}/>
                <div className={styles.colorBox} style={{backgroundColor: COLORS.YELLOW}}/>
            </div>
        </div>
        <div className={styles.toolitem}>
            <h4 className={styles.tooltext}>Brush Size</h4>
            <input type='range' min={1} max={10} step={1} onChange={updateBrush} />
        </div>
    </div>
  )
}

export default Toolbox