import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
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
        
        <Toolbar isAuthenticated={this.props.isAuthenticated} showSideDrawer={this.showSideDrawerHandler}/> 
        {/* this.state.showSideDrawer ? <SideDrawer/> : null */}
        <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} showSideDrawerHandler={this.showSideDrawerHandler}/> 
            <main className={styles.Content}>
                {this.props.children}
            </main>
    </Auxiliary>
    }
}
const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);