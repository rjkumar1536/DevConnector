import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import Moment from 'react-moment'
import {addLike, removeLike, deletePost} from '../../actions/post';

const PostItem = ({post : {user , _id, name , text,avatar, likes, comments, date}, auth, addLike, removeLike, deletePost}) => {
    const handleLike = ()=>{
        addLike(_id);
    }
    const handleDislike = ()=>{
        removeLike(_id);
    }
    const handleDelete = ()=>{
        deletePost(_id);
    }
    return (
        <Fragment>
            <div className="posts">
                <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt=""
                    />
                    <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {text}
                    </p>
                    <p className="post-date">
                        Posted on {' '}
                        <Moment format = "YYYY/MM/DD">{date}</Moment>
                    </p>
                    <button type="button" className="btn btn-light" onClick = {()=>handleLike()}>
                    <i className="fas fa-thumbs-up"></i>{' '}
                    {
                        likes.length > 0 && (
                            <span>{likes.length}</span>
                        )
                    }
                    </button>
                    <button type="button" className="btn btn-light" onClick = {()=>handleDislike()}>
                    <i className="fas fa-thumbs-down"></i>{' '}
                    </button>
                    <Link to={`/posts/${_id}`} className="btn btn-primary">
                    Discussions {' '}
                    {
                        comments.length > 0 && (
                                <span className='comment-count'>{comments.length}</span>
                        )
                    }
                    </Link>
                    {
                        !auth.loading && auth.user._id == user && (
                            <button    
                                onClick = {()=>handleDelete()}  
                                type="button"
                                className="btn btn-danger">
                                <i className="fas fa-times"></i>
                            </button>
                        )
                    }
                </div>
                </div>
            </div>
        </Fragment>
    )
}

PostItem.propTypes = {
    auth : PropTypes.object.isRequired,
    addLike : PropTypes.func.isRequired,
    removeLike : PropTypes.func.isRequired,
    deletePost : PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        auth : state.authReducer
    }
}

export default connect(mapStateToProps, {addLike, removeLike,deletePost})(PostItem)
