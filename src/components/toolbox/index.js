import React from 'react';
import styles from "./index.module.css";
import { COLORS } from '../constant';
import { useSelector, useDispatch } from 'react-redux';
import { changeColor, changeBrushSize } from '@/slice/toolboxSlice'
import { MENU_ITEMS } from '../constant';
import cx from 'classnames';
import { socket } from "@/socket";

const Toolbox = () => {

    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    /*const roomno = useSelector((state) => state.room.roomno) || ''; */
    const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.RECT || activeMenuItem === MENU_ITEMS.LINE;
    const showBrushToolOption = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER || activeMenuItem === MENU_ITEMS.RECT || activeMenuItem === MENU_ITEMS.LINE;
    const {color, size} = useSelector((state)=> state.toolbox[activeMenuItem] )

    const updateBrush = (e) => {
        dispatch(changeBrushSize({item: activeMenuItem, size: e.target.value}))
        socket.emit('changeConfig', {color, size: e.target.value})
    };
    const updateColor = (newcolor) => {
        dispatch(changeColor({item: activeMenuItem, color: newcolor}))
        socket.emit('changeConfig', {color:newcolor,size})
    };

    return (
        <div>
            {showBrushToolOption && (
                <div className={styles.toolbox}>
                    {showStrokeToolOption && (
                        <div className={styles.toolitem}>
                            <h4 className={styles.tooltext}>Stroke Color</h4>
                            <div className={styles.itemContainer}>
                                <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.BLACK})} style={{ backgroundColor: COLORS.BLACK }} onClick={()=>updateColor(COLORS.BLACK)} />
                                <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.RED})} style={{ backgroundColor: COLORS.RED }} onClick={()=>updateColor(COLORS.RED) }/>
                                <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.GREEN})} style={{ backgroundColor: COLORS.GREEN }} onClick={()=>updateColor(COLORS.GREEN) } />
                                <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.BLUE})} style={{ backgroundColor: COLORS.BLUE }} onClick={()=>updateColor(COLORS.BLUE) } />
                                <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.ORANGE})} style={{ backgroundColor: COLORS.ORANGE }} onClick={()=>updateColor(COLORS.ORANGE) } />
                                <div className={cx(styles.colorBox, {[styles.active]: color === COLORS.YELLOW})} style={{ backgroundColor: COLORS.YELLOW }} onClick={()=>updateColor(COLORS.YELLOW) } />
                            </div>
                        </div>
                    )}

                    {showBrushToolOption && (
                        <div className={styles.toolitem}>
                            <h4 className={styles.tooltext}>Brush Size</h4>
                            <input type='range' min={1} max={10} step={1} onChange={updateBrush} value={size} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Toolbox;
