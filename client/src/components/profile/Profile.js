import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Top from './Top'
import About from './About'
import Education from './Education'
import Experience from './Experience'
import Github from './Github'
import {getProfileById} from '../../actions/profile'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner'

const Profile = ({profile : {profile ,loading, githubusername}, match, auth, getProfileById}) => {
    useEffect(() => {
       getProfileById(match.params.id);
    }, [getProfileById])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner></Spinner> : 
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                    { 
                        auth.isAuntheticated && auth.user._id == profile.user._id ? (
                            <Link to="/edit-profile" className="btn btn-light">
                                <i className="fas fa-user-circle text-primary"></i> 
                                    Edit Profile
                            </Link>) : <Fragment></Fragment>
                    }
                    <div className="profile-grid my-1">
                        <Top profile = {profile} loading = {loading}/>
                        <About profile = {profile} loading = {loading} />
                        <Experience profile = {profile} loading = {loading} />
                        <Education profile = {profile} loading = {loading} />
                        <Github username = {profile.githubusername} />
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    profile : PropTypes.object.isRequired,
    getProfileById : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
}

const mapStateToProps = (state)=>{
    return {
        profile : state.profileReducer,
        auth : state.authReducer
    }
}
export default connect(mapStateToProps, {getProfileById})(Profile);
