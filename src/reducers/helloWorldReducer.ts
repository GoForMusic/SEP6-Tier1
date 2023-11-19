import {
    HTTP_REQ_SUCCESS,
    HTTP_REQ_FAILED
} from '../constants/helloWorld'


const initialState = {
    message: null,
    error: null
};

const helloWorldReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case HTTP_REQ_SUCCESS:
            return {...state, message: action.payload}
        case HTTP_REQ_FAILED:
            return {...state, error: action.payload}
        default: 
            return state;
    }
}

export default helloWorldReducer;