import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'
import {Link} from 'react-router-dom';
const navigationItems =(props) =>(
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/"  >Burger Builder</NavigationItem>
        {/* <NavigationItem link="/checkout"  >Checkout</NavigationItem> */}
        <NavigationItem link="/orders"  >Orders</NavigationItem>
        
        
    </ul>
);
export default navigationItems;