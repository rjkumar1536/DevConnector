import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {removeComment} from '../../actions/post'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const Comment = ({post, comment, removeComment, auth})=> {
    const handleDelete = ()=>{
        removeComment(post._id, comment._id)
    }
    return (
        <Fragment>
            <div className="comments">
                <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${comment.user}`}>
                    <img
                        className="round-img"
                        src={comment.avatar}
                        alt=""
                    />
                    <h4>{comment.name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                    {comment.text}
                    </p>
                    <p className="post-date">
                        Posted on {' '}
                        <Moment format = "YYYY/MM/DD">{comment.date}</Moment>
                    </p>
                    {
                        !auth.loading && auth.user._id == comment.user && (
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

Comment.propTypes = {

}

const mapStateToProps = (state)=>{
    return {
        auth : state.authReducer
    }
}

export default connect(mapStateToProps, {removeComment})(Comment)
