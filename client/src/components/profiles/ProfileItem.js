import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const ProfileItem = ({profile}) => {
    return (
        <Fragment>
                <div className="profile bg-light">
                    <img
                        className="round-img"
                        src= {profile.user.avatar}
                        alt="" />
                    <div>
                        <h2>{profile.user.name}</h2>
                        <p>{profile.status}</p>
                        <p>{profile.location}</p>
                        <Link to = {`/profile/${profile.user._id}`} className="btn btn-primary">View Profile</Link>
                    </div>

                    <ul>
                        {
                            profile.skills.map((skill,index)=>{
                                return (
                                    <li key = {`skill-${index}`} className="text-primary">
                                    <i className="fas fa-check"></i> {skill}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>        
            </Fragment>
    )
}

ProfileItem.propTypes = {

}

export default connect()(ProfileItem);
