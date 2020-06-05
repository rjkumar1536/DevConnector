import axios from 'axios';
import {setAlert} from '../actions/action';
import {
    LOAD_PROFILE , 
    LOAD_PROFILES , 
    PROFILE_ERROR, 
    CLEAR_PROFILE,
    ADD_EXPERIENCE, 
    ADD_EDUCATION, 
    DELETE_EDUCATION, 
    DELETE_EXPERIENCE, 
    DELETE_ACCOUNT, 
    GET_REPOS,
} from '../actions/types';

export const getCurrentProfile = ()=>async (dispatch)=>{
    try {
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['x-auth-token'] = token;
        let res = await axios.get('/api/profiles/me');
        dispatch({type : LOAD_PROFILE, payload : res.data})
    } catch (error) {
        let err = error.response.data;
        if(err)
        dispatch(setAlert(err, 'danger'));
        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
    }
}

export const getProfiles = ()=>async (dispatch)=>{
    try {
        dispatch({type : CLEAR_PROFILE})
        let res = await axios.get('/api/profiles');
        dispatch({type : LOAD_PROFILES, payload : res.data})
    } catch (error) {
        let err = error.response.data;
        if(err)
        dispatch(setAlert(err, 'danger'));
        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
    }
}

export const getProfileById = (userId)=>async (dispatch)=>{
    try {
        dispatch({type : CLEAR_PROFILE})
        let res = await axios.get(`/api/profiles/user/${userId}`);
        await dispatch({type : LOAD_PROFILE, payload : res.data})
    } catch (error) {
        if(error.response){
            // console.log(error.response);
            let err = error.response.data;
            // let err;
            if(err)
            dispatch(setAlert(err, 'danger'));
            dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
        }
       
    }
}


export const getGitRepos = (username)=>async (dispatch)=>{
    try {
        let res = await axios.get(`/api/profiles/github/${username}`);
        dispatch({type : GET_REPOS, payload : res.data})
    } catch (error) {
        let err = error.response.data;
        if(err)
        dispatch(setAlert(err, 'danger'));
        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
    }
}


export const createProfile = (formData , history , edit = false)=> async ( dispatch )=>{
    try {
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const body = JSON.stringify(formData);
        const res = await axios.post('/api/profiles/', body, config );
        dispatch({type : LOAD_PROFILE, payload : res.data});
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if(!edit){
            history.push('/dashboard');
        }
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach((error)=>{
                dispatch(setAlert(error.msg, 'danger'));
            })
        }
        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
    }
}

export const addExperience = (formData, history)=> async (dispatch) =>{
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify(formData);
    try {
        const res =await axios.put('/api/profiles/experience', body, config);
        dispatch({type : ADD_EXPERIENCE ,payload : res.data})
        dispatch(setAlert('Experience Added in profile' , 'success'));
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach((error)=>{
                dispatch(setAlert(error.msg, 'danger'));
            })
        }
        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
    }
}

export const addEducation = (formData, history)=> async (dispatch) =>{
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify(formData);
    try {
        const res =await axios.put('/api/profiles/education', body, config);
        dispatch({type : ADD_EDUCATION ,payload : res.data})
        dispatch(setAlert('Eduaction Added in profile' , 'success'));
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach((error)=>{
                dispatch(setAlert(error.msg, 'danger'));
            })
        }
        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
    }
}

export const deleteExperience = (id)=>async (dispatch)=>{
    try {
        const res = await axios.delete(`/api/profiles/experience/${id}`);
        dispatch({type : DELETE_EXPERIENCE ,payload : res.data})
        dispatch(setAlert('Experience Deleted from profile' , 'success'));
    } catch (error) {
        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
    }
}

export const deleteEducation = (id)=>async (dispatch)=>{
    try {
        const res = await axios.delete(`/api/profiles/education/${id}`);
        dispatch({type : DELETE_EDUCATION ,payload : res.data})
        dispatch(setAlert('Education Deleted from profile' , 'success'));
    } catch (error) {
        dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
    }
}


export const deleteAccount = (history)=>async (dispatch)=>{
    if(window.confirm('Are you want to delete your account ?')){
        try {
            await axios.delete('/api/profiles');
            dispatch({type : CLEAR_PROFILE})
            dispatch(setAlert('Your Account has been permanently Deleted'));
            dispatch({type : DELETE_ACCOUNT});
        } catch (error) {
            dispatch({type : PROFILE_ERROR, payload : {msg : error.response.statusText, status : error.response.status}})
        }
    }
}