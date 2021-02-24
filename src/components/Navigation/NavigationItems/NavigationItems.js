import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'

const navigationItems =(props) =>(
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/"  >Burger Builder</NavigationItem>
        {/* <NavigationItem link="/checkout"  >Checkout</NavigationItem> */}
        {props.isAuthenticated ? 
            <NavigationItem link="/orders"  >Orders</NavigationItem>:
            null}
            
        {props.isAuthenticated ?   
        
            <NavigationItem link="/logout"  >Logout</NavigationItem>:
            <NavigationItem link="/auth"  >Login</NavigationItem>
        }
        
        
    </ul>
);
export default navigationItems;