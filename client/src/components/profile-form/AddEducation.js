import React, { Fragment , useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {addEducation} from '../../actions/profile';
import {connect} from 'react-redux'

const AddEducation = ({addEducation, history}) => {

    const handleChange = (e)=>{
        if(e.target.name === 'current'){
            setFormData({...formData, [e.target.name] : !current});
        }
        else
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        addEducation(formData,history);
    }

    const [formData , setFormData] =  useState({
        school : '',
        fieldofstudy : '',
        from : '',
        to : '',
        degree : '',
        current : false,
        description : ''
});
    const {
        school,
        degree,
        fieldofstudy,
        from ,
        to,
        current,
        description
    }= formData;
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit = {(e) => handleSubmit(e)}>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    required
                    value ={school}
                    onChange = {(e)=>handleChange(e)}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    required
                    value = {degree}
                    onChange = {(e)=>handleChange(e)}
                />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field Of Study" name="fieldofstudy" value = {fieldofstudy} onChange = {(e)=>handleChange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value = {from} onChange = {(e)=>handleChange(e)}/>
                </div>
                <div className="form-group">
                <p>
                    <input type="checkbox" name="current" value = {current} onChange = {(e)=>handleChange(e)} /> Current School or Bootcamp
                </p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value ={to} onChange = {(e)=>handleChange(e)} disabled = {current}/>
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value = {description}
                    onChange = {(e)=>handleChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation : PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(AddEducation);
