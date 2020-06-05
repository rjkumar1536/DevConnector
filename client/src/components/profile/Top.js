import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const Top = ({profile : {user : {name, avatar}, website,social : {twitter, facebook, youtube, linkdln, instagram}, location , status }, loading}) => {
    return (
        <Fragment>
              <div className="profile-top bg-primary p-2">
              <img
                className="round-img my-1"
                src={avatar}
                alt=""
              />
              <h1 className="large">{name}</h1>
              <p className="lead">{status}</p>
              <p>{location}</p>
              <div className="icons my-1">
              {
                website &&  <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-globe fa-2x"></i>
                </a>
              }
              {
                twitter && <a href={twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              }
              
              {
                facebook && <a href={facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              }
              {
                linkdln && <a href={linkdln} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              }
              {
                youtube && <a href={youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-2x"></i>
                </a>
              }
              {
                instagram &&  <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              }
              </div>
        </div>
        </Fragment>
    )
}

export default Top
