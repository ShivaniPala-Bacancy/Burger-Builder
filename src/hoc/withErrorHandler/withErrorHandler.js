import React from 'react';
import useHttpErrorHandler from '../../hooks/httpErrorHandler'
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary';
const withErrorHandler =(WrappedComponent, axios) =>{
    return props=> {
      const [error, clearError] = useHttpErrorHandler(axios);
            return (
                <Auxiliary>
                    <Modal 
                    show={error}
                    modalClosed={clearError}>
                        {error ?  error.message : null}
                        Something didn't work
                    </Modal>
                    <WrappedComponent {...props} />
                </Auxiliary>
            );
            
        }
       
}

export default withErrorHandler;