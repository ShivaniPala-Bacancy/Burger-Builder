import React from 'react';
import burgerLogo from '../../assests/images/28.1 burger-logo.png.png';
import styles from './Logo.module.css'

const logo=(props)=>(
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)
export default logo;