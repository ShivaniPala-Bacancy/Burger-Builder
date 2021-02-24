import React from 'react';
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
const toolbar =(props)=>(
    <header className={styles.Toolbar}>
        <div onClick={props.showSideDrawer} className={styles.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems 
                isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
)
export default toolbar;
