import React from 'react';
import styles from "./index.module.css";
import { COLORS } from '../constant';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_ITEMS } from '../constant';

const Toolbox = () => {
    const updateBrush = (e) => {
        // Your updateBrush logic
    };

    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER;

    return (
        <div>
            {showBrushToolOption && (
                <div className={styles.toolbox}>
                    {showStrokeToolOption && (
                        <div className={styles.toolitem}>
                            <h4 className={styles.tooltext}>Stroke Color</h4>
                            <div className={styles.itemContainer}>
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.BLACK }} />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.RED }} />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.GREEN }} />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.BLUE }} />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.ORANGE }} />
                                <div className={styles.colorBox} style={{ backgroundColor: COLORS.YELLOW }} />
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
