import React from 'react';
import styles from "./index.module.css";
import { COLORS } from '../constant';
import { useSelector, useDispatch } from 'react-redux';
import { changeColor, changeBrushSize } from '@/slice/toolBoxSlice'
import { MENU_ITEMS } from '../constant';

const Toolbox = () => {

    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;

    const updateBrush = (e) => {
        dispatch(changeBrushSize({item: activeMenuItem, size: e.target.value}))
    };
    const updateColor = (e) => {
        dispatch(changeColor({item: activeMenuItem, color: e }))
    };

    return (
        <div>
            {showBrushToolOption && (
                <div className={styles.toolbox}>
                    {showStrokeToolOption && (
                        <div className={styles.toolitem}>
                            <h4 className={styles.tooltext}>Stroke Color</h4>
                            <div className={styles.itemContainer}>
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.BLACK }} onClick={()=>updateColor(COLORS.BLACK)} />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.RED }} onClick={()=>updateColor(COLORS.RED) }/>
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.GREEN }} onClick={()=>updateColor(COLORS.GREEN) } />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.BLUE }} onClick={()=>updateColor(COLORS.BLUE) } />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.ORANGE }} onClick={()=>updateColor(COLORS.ORANGE) } />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.YELLOW }} onClick={()=>updateColor(COLORS.YELLOW) } />
                            </div>
                        </div>
                    )}

                    {showBrushToolOption && (
                        <div className={styles.toolitem}>
                            <h4 className={styles.tooltext}>Brush Size {activeMenuItem} </h4>
                            <input type='range' min={1} max={10} step={1} onChange={updateBrush} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Toolbox;
