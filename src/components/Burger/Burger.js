import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
const burger =(props) =>{
    // let transformedIngredients = Object.keys(props.ingredients)
    // .map(igKey =>{
    //     return [...Array(props.ingredients[igKey])].map((_, index)=>{
    //          return <BurgerIngredient key={igKey +index} type={igKey}/>
    //     })
    // })
    // .reduce((arr, el) =>{
    //     return arr.concat(el)
    // }, []);
    // console.log(transformedIngredients);

    
    // if(transformedIngredients.length ===0){
    //     transformedIngredients= <p>Please Start Adding Ingredients</p>
    // }

    //////////////////////////////

    const names= Object.keys(props.ingredients);
    const amt=[];
    for(let i=0;i<names.length;i++){
        amt[i]= props.ingredients[names[i]];
    }
    let finalArr= [];
    for(let j=0;j<amt.length;j++){
        for(let k=1;k<=amt[j];k++){
            finalArr.push(names[j]);
        }
    }

    
    let transformedIngredients= finalArr.map((item, index) => {
        return <BurgerIngredient key={index} type={item} />
    })
    if(finalArr.length ===0){
        transformedIngredients= <p>Please start adding my ingredients</p>
    }

    return(
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );
}

export default burger;