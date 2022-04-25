import React from 'react';
import { NavLink } from 'react-router-dom';
import {  RiBarChartBoxLine } from 'react-icons/ri';
import { AiTwotoneAppstore} from 'react-icons/ai';
import styles from './index.module.scss';

const SideBar = () => {
    return(
        <div className={styles._}>
            <div className={styles.container}>
            <div className={styles.nav_list}>
                    <NavLink to="/metrics" className={styles.nav_item} activeClassName={styles.selected}>
                        <div className={styles.nav_icon}>
                            <AiTwotoneAppstore  className={styles.fill_icon}/>
                        </div>
                        <div className={styles.nav_text}>
                            <p>Metrics</p>
                        </div>
                    </NavLink>
                    <NavLink to="/metrics-chart" className={styles.nav_item} activeClassName={styles.selected}>
                        <div className={styles.nav_icon}>
                            <RiBarChartBoxLine  className={styles.fill_icon}/>
                        </div>
                        <div className={styles.nav_text}>
                            <p>Chart</p>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SideBar
