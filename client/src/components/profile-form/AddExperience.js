import React, { Fragment , useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {addExperience} from '../../actions/profile'

const AddExperience = ({history, addExperience}) => {
    const handleChange = (e)=>{
        if(e.target.name === 'current')
        setFormData({...formData, [e.target.name] : !current});
        else 
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        addExperience(formData, history);
    }

    const [formData , setFormData] =  useState({
            title : '',
            company : '',
            from : '',
            to : '',
            location : '',
            current : false,
            description : ''
    });
    const {
        title,
        company,
        from ,
        to,
        location,
        current,
        description
    } = formData;
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit = {(e) => handleSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="* Job Title" name="title" required value ={title} onChange = {(e)=>handleChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Company" name="company" required value = {company} onChange = {(e)=>handleChange(e)}/>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value = {location} onChange = {(e)=>handleChange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value = {from} onChange = {(e)=>handleChange(e)}/>
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" value={current} onChange = {(e)=>handleChange(e)} /> Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value = {to} onChange = {(e)=>handleChange(e)} disabled = {current}/>
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    value = {description}
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    onChange = {(e)=>handleChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience : PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(AddExperience)
