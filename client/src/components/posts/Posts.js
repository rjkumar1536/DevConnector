import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPosts} from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import {createPost} from '../../actions/post'

const Posts = ({post : {posts, loading}, getPosts, createPost}) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])

    const handleChange = (e)=>{
        setFormData({text : e.target.value})
    }
    const [formData, setFormData] =  useState({
        text : 'Create a post'
    })
    const handleSubmit = (e)=>{
        e.preventDefault();
        createPost(text);
    }
    const {text} = formData;
    return (
        
        <Fragment>
            {
                loading ? <Spinner></Spinner>:
                <Fragment>
                        <h1 className="large text-primary">
                        Posts
                        </h1>
                        <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

                        <div className="post-form">
                            <div className="bg-primary p">
                            <h3>Say Something...</h3>
                            </div>
                            <form className="form my-1" onSubmit = {(e)=>handleSubmit(e)}>
                            <textarea
                                onChange = {(e)=>handleChange(e)}
                                name="text"
                                cols="30"
                                rows="5"
                                value = {text}
                                placeholder="Create a post"
                                required
                            ></textarea>
                            <input type="submit" className="btn btn-dark my-1" value="Submit" />
                            </form>
                        </div>
                        {
                            posts.map((post)=>{
                                return <PostItem key = {post._id} post = {post}/>
                            })
                        }
                </Fragment>
            }
        </Fragment>
    )
}

Posts.propTypes = {
    post : PropTypes.object.isRequired,
    getPosts : PropTypes.func.isRequired,
    createPost : PropTypes.func.isRequired,
}
const mapStateToProps = (state)=>{
    return {
        post : state.postReducer
    }
}

export default connect(mapStateToProps, {getPosts, createPost} )(Posts)
