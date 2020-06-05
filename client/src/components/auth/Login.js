import React, {useState} from 'react'
import {connect} from 'react-redux';
import {Link , Redirect} from 'react-router-dom';
import {loginUser} from '../../actions/auth';
import PropTypes from 'prop-types'


const Login = ({loginUser, isAuthenticated}) => {

    const [formData , setData] = useState({
        email : '',
        password : ''
    });

    const handleChange = (e)=>{
        setData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        loginUser({email, password});
    }
     
    if(isAuthenticated){
        return <Redirect  to = "/dashboard"/>
    }

    const {email , password} = formData;
    return (
        <div>
            <h1 className ="large text-primary">Sign In</h1>
            <p className ="lead"><i className ="fas fa-user"></i> Sign into Your Account</p>
            <form className ="form" onSubmit = {(e)=>handleSubmit(e)}>
                <div className ="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value = {email}
                    onChange = {(e)=> handleChange(e)}
                />
                </div>
                <div className ="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value = {password}
                    onChange = {(e)=> handleChange(e)}
                />
                </div>
                <input type="submit" className ="btn btn-primary" value="Login" />
            </form>
            <p className ="my-1">
                Don't have an account? <Link to="register.html">Sign Up</Link>
            </p>
        </div>
    )
}

Login.propTypes = {
    loginUser : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool.isRequired,
}
const mapStateToProps = (state)=>{
    return {isAuthenticated : state.authReducer.isAuthenticated}
}

export default connect(mapStateToProps, {loginUser})(Login);
