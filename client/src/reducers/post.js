import {GET_POSTS , POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, DELETE_COMMENT} from '../actions/types'
const initialState = {
    post : [],
    posts : [],
    loading : true,
    error : {}
}
const postReducer = (state = initialState, action)=>{
    const {type, payload} = action;
    switch(type){
        case GET_POSTS:
            return {...state, posts : payload, loading : false}
        case POST_ERROR :
            return {...state, loading : false, error : payload}
        case UPDATE_LIKES :
            return {
                ...state,
                posts : state.posts.map((post)=>{
                    if(post._id == payload.postId){
                        return {...post,likes : payload.likes }
                    }
                    else{
                        return post
                    }
                })
            }
        case DELETE_POST : 
            return {
                ...state,
                posts : state.posts.filter((post)=>post._id != payload)
            }
        case ADD_POST :
            return {
                ...state,
                posts : [payload, ...state.posts]
            }
        case GET_POST : 
            return {
                ...state,
                post : payload,
                loading : false
            }
        case ADD_COMMENT : 
            return {
                ...state,
                post : {...state.post, comments : payload},
                loading : false
            }
        case DELETE_COMMENT :
            return {
                ...state,
                post : {...state.post, comments: state.post.comments.filter((comment)=>{
                    return comment._id != payload
                })},
                loading : false

            }
        default :
            return state;   
    }
}

export default postReducer;