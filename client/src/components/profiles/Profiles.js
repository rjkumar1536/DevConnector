import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Fragment , useEffect} from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner';
import {getProfiles} from '../../actions/profile'
import profileReducer from '../../reducers/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({profiles : {profiles , loading}, getProfiles}) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    return (
        <Fragment>
             {loading ? <Spinner /> : 
            <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map((profile)=>{
                            return <ProfileItem key = {profile._id} profile = {profile}></ProfileItem>
                        })
                    ) : 
                    <h4>No Profile Exists</h4> }
                </div>
            </Fragment>}
        </Fragment>
       
    )
}

Profiles.propTypes = {
    profiles : PropTypes.object.isRequired,
    getProfiles : PropTypes.func.isRequired,
}
const mapStateToProps = (state)=>{
    return {
        profiles : state.profileReducer
    }
}
export default connect(mapStateToProps, {getProfiles})(Profiles);
