import React from 'react';

import styles from './index.module.scss';

const Nav = () => {

    return(
        <div className={styles._}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    Factorial Metric Visualizer
                </div>
                <div className={styles.nav_user_profile}>
                    <div className={styles.user_img}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;