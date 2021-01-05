import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component{
    constructor(props){
        super(props);
        this.state={
            showSideDrawer: false
        }
    }
    showSideDrawerHandler =() =>{
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
            
    }
    render(){
    return <Auxiliary>
        
        <Toolbar showSideDrawer={this.showSideDrawerHandler}/> 
        {/* this.state.showSideDrawer ? <SideDrawer/> : null */}
        <SideDrawer open={this.state.showSideDrawer} showSideDrawerHandler={this.showSideDrawerHandler}/> 
        <main className={styles.Content}>
            {this.props.children}
        </main>
    </Auxiliary>
    }
}

export default Layout;