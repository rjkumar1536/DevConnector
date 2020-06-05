import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Education = ({profile : {education}}) => {
    return (
        <Fragment>
                <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {
                    education.map((edu, index)=>{
                        return (
                                <div key = {index}>
                                    <h3>{edu.school}</h3>
                                    <p>
                                        <Moment format = 'YYYY/MM/DD'>{edu.from}</Moment>-
                                        <Moment format = 'YYYY/MM/DD'>{edu.to ? edu.to : `Now`}</Moment></p>
                                    <p><strong>Degree: </strong>{edu.degree}</p>
                                    <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                                    <p>
                                    <strong>Description: </strong>{edu.description}
                                    </p>
                                </div>
                        )
                    })
                }
                </div>
        </Fragment>
    )
}

export default Education
