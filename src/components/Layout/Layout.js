import React, { useState } from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const showSideDrawerHandler =() =>{
        setShowSideDrawer(!showSideDrawer);  
    }
    
    return <Auxiliary>
        
        <Toolbar isAuthenticated={props.isAuthenticated} showSideDrawer={showSideDrawerHandler}/> 
        {/* this.state.showSideDrawer ? <SideDrawer/> : null */}
        <SideDrawer isAuthenticated={props.isAuthenticated} open={showSideDrawer} showSideDrawerHandler={showSideDrawerHandler}/> 
            <main className={styles.Content}>
                {props.children}
            </main>
    </Auxiliary>
 
}
const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);