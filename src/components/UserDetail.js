import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UserDetail = ({ location: { state: { user: { userDetails: { avatar, bio, blog, company, email, followers, following, gists, location, login, name, repos } } } }}) => {
    return (
        <Wrapper>
            <h1>User Details</h1>
            <h1>Name: {name || 'N/A'}</h1>
            <h1>Login: {login || 'N/A'}</h1>
            <h1>About: {bio || 'N/A'}</h1>
            <p>Blog: {blog || 'N/A'}</p>
            <p>Company: {company || 'N/A'}</p>
            <p>Email: {email || 'N/A'}</p>
            <p>Location: {location || 'N/A'}</p>
            <p>Followers: {followers || 'N/A'}</p>
            <p>Following: {following || 'N/A'}</p>
            <p>Public Gists: {gists || 'N/A'}</p>
            <p>Public Repos: {repos || 'N/A'}</p>
        </Wrapper>
    )
}

export default UserDetail