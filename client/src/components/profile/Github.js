import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {getGitRepos} from '../../actions/profile'
import {connect} from 'react-redux'

const Github = ({username, repos, getGitRepos}) => {
    useEffect(() => {
        getGitRepos(username)
    }, [getGitRepos, username])
    return (
        <Fragment>
            <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github"></i> Github Repos
                </h2>
                { 
                    repos !== null && repos.map((repo)=>{
                        return (
                            <div key = {repo.id}className="repo bg-white p-1 my-1">
                                <div>
                                <h4><a href={repo.html_url} target="_blank"
                                    rel="noopener noreferrer">{repo.name}</a></h4>
                                <p>
                                    {repo.description}
                                </p>
                                </div>
                                <div>
                                <ul>
                                    <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                    <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                                    <li className="badge badge-light">Forks: {repo.forks_count}</li>
                                </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}
Github.prototype = {
    repos : PropTypes.object.isRequired,
}
const mapStateToProps = (state)=>{
    return {
        repos : state.profileReducer.repos
    }
}
export default connect(mapStateToProps, {getGitRepos})(Github)
