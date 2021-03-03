import {useState, useEffect} from 'react';

export default (httpclient) => {
    const [error, setError] = useState(null);
        
        
        let reqInterceptor = httpclient.interceptors.request.use(req=>{
            setError(null)
            return req;
        })
        let resInterceptor = httpclient.interceptors.response.use(res => {
            return res
        }, err=>{
            setError(err)
        });
        
        useEffect(() => {
            return () => {
            httpclient.interceptors.request.eject(reqInterceptor);
            httpclient.interceptors.response.eject(resInterceptor);
            }
        }, [resInterceptor, reqInterceptor]);
          
        const errorConfirmedHandler=() =>{
            setError(null);
        };

        return [error, errorConfirmedHandler];
    }
        
