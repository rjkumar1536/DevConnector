import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createProfile} from '../../actions/profile'
import {getCurrentProfile} from '../../actions/profile'

const EditProfile = ({profile : {loading, profile} ,history , createProfile, getCurrentProfile}) => {
    const [formData, setformData] = useState({
        company : '',
        website : '',
        location : '',
        status : '',
        skills : '',
        bio : '',
        githubusername : '',
        youtube : '',
        twitter : '',
        facebook : '',
        linkdln : '',
        instagram : ''
    });

    console.log(profile.skills)
    useEffect(() => {
            getCurrentProfile();
            setformData({
                company : loading || !profile.company ? '' : profile.company,
                website : loading || !profile.website ? '' : profile.website,
                location : loading || !profile.location ? '' : profile.location,
                status : loading || !profile.status ? '' : profile.status,
                skills : loading || !profile.skills ? '' : profile.skills.join(','),
                bio : loading || !profile.bio ? '' : profile.bio,
                githubusername :loading || !profile.githubusername ? '' : profile.githubusername,
                youtube : loading || !profile.social ? '' : profile.social.youtube,
                twitter : loading || !profile.social ? '' : profile.social.twitter,
                facebook : loading || !profile.social ? '' : profile.social.facebook,
                linkdln : loading || !profile.social ? '' : profile.social.linkdln,
                instagram : loading || !profile.social ? '' : profile.social.instagram
            })
    }, [loading])

    const handleChange = (e)=>{
        setformData({...formData,[e.target.name] : e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        createProfile(formData, history , true);
    }
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        facebook,
        linkdln,
        instagram
    } = formData

    const [displaySocialLinks, toggleSocialLink] = useState(false)
    return (
        <Fragment>
            <h1 className="large text-primary">
            Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> 
                Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit = {(e)=>handleSubmit(e)}>
            <div className="form-group">
                <select name="status" value = {status} onChange = {(e)=>handleChange(e)}>
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
                </select>
                <small className="form-text">Give us an idea of where you are at in your career</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Company" name="company" value = {company} onChange = {(e)=>handleChange(e)} />
                <small className="form-text"
                >Could be your own company or one you work for</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Website" name="website" value = {website} onChange = {(e)=>handleChange(e)}/>
                <small className="form-text"
                >Could be your own or a company website</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" value = {location} onChange = {(e)=>handleChange(e)} />
                <small className="form-text"
                >City & state suggested (eg. Boston, MA)</small>
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills" onChange = {(e)=>handleChange(e)} value = {skills}/>
                <small className="form-text"
                >Please use comma separated values (eg.
                HTML,CSS,JavaScript,PHP)</small>
            </div>
            <div className="form-group">
                <input
                type="text"
                placeholder="Github Username"
                name="githubusername"
                value = {githubusername}
                onChange = {(e)=>handleChange(e)}
                />
                <small className="form-text"
                >If you want your latest repos and a Github link, include your
                username</small>
            </div>
            <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value = {bio} onChange = {(e)=>handleChange(e)}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
            </div>

            <div className="my-2">
                <button type="button" className="btn btn-light" onClick = {()=> toggleSocialLink(!displaySocialLinks)}>
                Add Social Network Links
                </button>
                <span>Optional</span>
            </div>
            
            {displaySocialLinks && <Fragment>
                <div className="form-group social-input" >
                    <i className="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL" name="twitter" value = {twitter} onChange = {(e)=>handleChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook" onChange = {(e)=>handleChange(e)} value = {facebook}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube" value = {youtube} onChange = {(e)=>handleChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" value = {linkdln} onChange = {(e)=>handleChange(e)}/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram" value = {instagram} onChange = {(e)=>handleChange(e)} />
                </div>
            </Fragment>}
            
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile : PropTypes.func.isRequired,
    getCurrentProfile : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
}

const mapStateToProps = (state)=>({
    profile : state.profileReducer
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(EditProfile);
