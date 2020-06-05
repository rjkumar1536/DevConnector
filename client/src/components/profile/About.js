import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const About = ({profile : {user : {name}, description, skills }, loading}) => {
    return (
        <Fragment>
            <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{`${name.trim().split(' ')[0]}'s Bio`}</h2>
                <p>
                    {description}
                </p>
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                    {
                        skills.map((skill, index)=>{
                            return (
                                <div key = {index} className="p-1"><i className="fa fa-check"></i> {skill}</div>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default About
