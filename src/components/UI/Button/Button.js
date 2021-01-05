import React from 'react';
import styles from './Button.module.css';

const button =(props) =>{
    let classes=[];
    classes.push(styles.Button);
    classes.push(styles[props.btnType]);
    if(props.disabled){
        console.log("btn is abled baby");
        // classes=[];
        classes.push(styles.Disabled);
        console.log(classes)
    }
    return (
        <button
            disabled={props.disabled}
            className={classes.join(" ")}
            onClick={props.clicked}> {props.children} </button>
    )
}

export default button;