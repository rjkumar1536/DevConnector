import React , {useEffect, Fragment}from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import {DashboardActions} from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import {deleteAccount} from '../../actions/profile'
const Dashboard = ({getCurrentProfile, auth : {user} , profile : {profile, loading}, deleteAccount, history }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    const handleClick = ()=>{
        deleteAccount(history);
    }
    return (
        loading && profile === null ? <Spinner /> :
        <Fragment>
            <h1 className = "large text-primary">Dashboard</h1>
            <p className = "lead">
                <i className = "fas fa-user" />{ `  ${user && user.name}`}
            </p>
            {profile !== null ? 
            <Fragment>
                {profile.status}
                <DashboardActions/>
                <Experience experience = {profile.experience}/>
                <Education education = {profile.education}/>
            </Fragment>: 
            <Fragment>
                <p>you don't have profile , please create profile</p>
                <Link to = "/create-profile" className = "btn btn-primary my-1">Create Profile</Link>
            </Fragment>}
            <div className="my-2">
                <button className="btn btn-danger" onClick = {()=>handleClick()}>
                    <i className="fas fa-user-minus"></i>
                    Delete My Account
                </button>
            </div>
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired,
}
const mapStateToProps = (state)=>({
    auth : state.authReducer,
    profile : state.profileReducer,
    deleteAccount : PropTypes.func.isRequired,
})
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)
