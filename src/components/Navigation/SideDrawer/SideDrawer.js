import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'
const sideDrawer =(props) =>{
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if(props.open){
        attachedClasses[1]= [styles.Open];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.showSideDrawerHandler}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;