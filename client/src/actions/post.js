import axios from 'axios';
import {setAlert} from './action'
import {GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST,ADD_POST, GET_POST, ADD_COMMENT, DELETE_COMMENT} from './types'

export const getPosts = ()=> async (dispatch)=>{
    try {
        const res = await axios.get('/api/posts')
        dispatch(setAlert('posts retrieved successfully', 'success'));
        dispatch({type : GET_POSTS, payload : res.data})
    } catch (error) {
        if(error.response){
            dispatch(setAlert('post retrivel failed', 'danger'));
            dispatch({type : POST_ERROR, payload : {status : error.response.status, msg : error.response.statusText}})
        }
    }
}

export const addLike = (postId)=> async (dispatch)=>{
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)
        dispatch(setAlert('posts liked', 'success'));
        dispatch({type : UPDATE_LIKES, payload : { postId, likes : res.data}})
    } catch (error) {
        if(error.response){
            dispatch(setAlert(error.response.statusText, 'danger'));
            dispatch({type : POST_ERROR, payload : {status : error.response.status, msg : error.response.statusText}})
        }
    }
}

export const removeLike = (postId)=> async (dispatch)=>{
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`)
        dispatch({type : UPDATE_LIKES, payload : { postId, likes : res.data}})
    } catch (error) {
        if(error.response){
            dispatch(setAlert(error.response.statusText, 'danger'));
            dispatch({type : POST_ERROR, payload : {status : error.response.status, msg : error.response.statusText}})
        }
    }
}

export const deletePost = (postId) => async (dispatch)=>{
    try {
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({type : DELETE_POST, payload : postId})
        dispatch(setAlert('post deleted', 'success'));
    } catch (error) {
        dispatch({type : POST_ERROR, payload : {status : error.response.status, msg : error.response.statusText}})
    }
}

export const createPost = (text) => async (dispatch)=>{
    let config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    let body = JSON.stringify({text});
    try {
        const res = await axios.post("/api/posts", body, config);
        dispatch({type : ADD_POST, payload : res.data})
        dispatch(setAlert('post created', 'success'));
    } catch (error) {
        if(error.response)
        dispatch({type : POST_ERROR, payload : {status : error.response.status, msg : error.response.statusText}})
    }
}

export const getPost = (id)=> async (dispatch)=>{
    try {
        const res = await axios.get(`/api/posts/${id}`)
        dispatch(setAlert('posts retrieved successfully', 'success'));
        dispatch({type : GET_POST, payload : res.data})
    } catch (error) {
        if(error.response){
            dispatch(setAlert('post retrivel failed', 'danger'));
            dispatch({type : POST_ERROR, payload : {status : error.response.status, msg : error.response.statusText}})
        }
    }
}

export const addComment = (id, text) => async (dispatch)=>{
    let config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    let body = JSON.stringify({text});
    try {
        const res = await axios.post(`/api/posts/comment/${id}`, body,config)
        dispatch(setAlert('You commented', 'success'));
        dispatch({type : ADD_COMMENT, payload : res.data})
    } catch (error) {
        if(error.response){
            dispatch(setAlert('post retrivel failed', 'danger'));
            dispatch({type : POST_ERROR, payload : {status : error.response.status, msg : error.response.statusText}})
        }
    }
}

export const removeComment = (id, commentId) => async (dispatch)=>{
    try {
        const res = await axios.delete(`/api/posts/comment/${id}/${commentId}`)
        dispatch(setAlert('comment deleted', 'success'));
        dispatch({type : DELETE_COMMENT, payload : commentId})
    } catch (error) {
        if(error.response){
            dispatch(setAlert('post retrivel failed', 'danger'));
            dispatch({type : POST_ERROR, payload : {status : error.response.status, msg : error.response.statusText}})
        }
    }
}