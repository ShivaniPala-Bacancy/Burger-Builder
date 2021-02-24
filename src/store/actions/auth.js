import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

export const auth_start = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const auth_success = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};
export const auth_fail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
} 
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}
export const auth =(email, password, isSignUp) => {
    return dispatch => {
        dispatch(auth_start());
        const authData ={email: email,
        password: password,
        returnSecureToken: true
    }
    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBBq2iHb13ZGLKsuMEhhQH2N_w3cj_Ecw';
    if(!isSignUp){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBBq2iHb13ZGLKsuMEhhQH2N_w3cj_Ecw';
    }
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000); 
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem("userId", res.data.localId);
                dispatch(auth_success(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(auth_fail(err.response.data.error));
            })
    }
}

export const setAuthRedirect = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState= () => {
    return dispatch => {
        const token=  localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate= new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());
            }
            else{
                const userId= localStorage.getItem('userId');
                dispatch(auth_success(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            
        }
    }
}