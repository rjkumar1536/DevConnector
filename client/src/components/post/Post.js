import React, {useEffect, Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPost} from '../../actions/post'
import {addComment} from '../../actions/post'
import Spinner from '../layout/Spinner'
import Comment from './Comment'
import { Link } from 'react-router-dom'

const Post = ({getPost, addComment, post : {post , loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost])
    const [comment,setComment] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault();
        addComment(post._id, comment)
        setComment('');
    }
    const handleChange = (e)=>{
        setComment(e.target.value)
    }
    return (
        <Fragment>
            { loading || post === null ? 
            <Spinner></Spinner> : 
            <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
                <div>
                <Link to={`/profile/${post.user}`}>
                    <img
                    className="round-img"
                    src={post.avatar}
                    alt=""
                    />
                    <h4>{post.name}</h4>
                </Link>
                </div>
                <div>
                <p className="my-1">
                    {post.text}
                </p>
                </div>
            </div>
            <div className="post-form">
                <div className="bg-primary p">
                <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" onSubmit = {(e)=>handleSubmit(e)}>
                <textarea
                    onChange = {(e)=>handleChange(e)}
                    name="text"
                    cols="30"
                    rows="5"
                    value = {comment}
                    placeholder="Comment on this post"
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
            {
                post.comments  ?      
                post.comments.map((comment)=>{
                  return  <Comment post = {post} comment = {comment} key = {comment._id}/>
                }):<Fragment></Fragment>
            }

            </Fragment>
             }
        </Fragment>
       
    )
}

Post.propTypes = {
    getPost : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired,
    addComment : PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        post : state.postReducer
    }
}

export default connect(mapStateToProps, {getPost,addComment})(Post)
