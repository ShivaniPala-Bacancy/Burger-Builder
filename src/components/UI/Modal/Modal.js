import React from 'react';
import styles from "./Modal.module.css";
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

const Modal = props => {
    // shouldComponentUpdate( nextProps, nextState){
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    
    return (
    <Auxiliary>
        <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
        <div 
        className={styles.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
            {props.children}
        </div>
    </Auxiliary>
    )
    
};

export default React.memo(Modal, (prevProps, nextProps) => {return nextProps.show === prevProps.show && nextProps.children === prevProps.children});