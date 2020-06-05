import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Experience = ({profile : {experience}}) => {
    return (
        <Fragment>
              <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {
                        experience.map((exp,index)=>{
                            return (
                                <div key = {index}>
                                    <h3 className="text-dark">{exp.company}</h3>
                                    <p>
                                        <Moment format = 'YYYY/MM/DD'>{exp.from}</Moment>-
                                        <Moment format = 'YYYY/MM/DD'>{exp.to ? exp.to : `Now`}</Moment>
                                    </p>
                                    <p><strong>Position: </strong>{exp.title}</p>
                                    <p>
                                    <strong>Description: </strong>{exp.description}
                                    </p>
                                </div>
                            )
                        })
                    }
                    </div>
        </Fragment>
    )
}

export default Experience
