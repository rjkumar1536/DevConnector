import {LOAD_PROFILE , 
    PROFILE_ERROR, 
    CLEAR_PROFILE, 
    ADD_EXPERIENCE, 
    ADD_EDUCATION, 
    DELETE_EDUCATION, 
    DELETE_EXPERIENCE, 
    LOAD_PROFILES, 
    GET_REPOS} from '../actions/types'

const initialState = {
    profile : null,
    profiles : [],
    repos : [],
    loading : true,
    error : {}
}


const profileReducer = (state = initialState , action)=>{
    const {type, payload} = action;
    switch(type){
        case LOAD_PROFILE :
        case ADD_EXPERIENCE:
        case ADD_EDUCATION:
        case DELETE_EDUCATION :
        case DELETE_EXPERIENCE :
            return {...state, loading : false, profile : payload};
        case LOAD_PROFILES :
            return {...state, loading : false, profiles : payload}
        case PROFILE_ERROR :
            return {...state, error : payload}
        case CLEAR_PROFILE : 
            return {...state, profile : null, repos : null ,loading : false}
        case GET_REPOS : 
            return {...state , repos : payload  , loading : false}
        default : 
            return {...state, loading : false};
    }
}

export default profileReducer;