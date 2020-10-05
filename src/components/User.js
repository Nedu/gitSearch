import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import { Avatar, Card, CardHeader, CardContent, Typography, Grid, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';

import { useRateLimit } from '../contexts/RateLimit'
import { Loader, RateLimit } from '../shared';

const BulletPoint = styled.span`
    display: inline-block;
    margin: 0 2px;
    transform: scale(0.8);
`;

const CardRow = styled(Typography)`
    display: flex;
    margin-bottom: 0.2em;
`;

const User = ({ user }) => {
    const { rateLimit, setRateLimit } = useRateLimit()

    const getUserDetails = async (string, arg) => {
        try {
            const { data } = await axios.get(`https://api.github.com/users/${arg}`)
            return data
        } catch (err) {
            const { response } = err;

            if (response?.status === 403) {
                setRateLimit(true)
            }
        }
    }
    
    const { data, error, isLoading, isError } = useQuery(["users", user.login], getUserDetails, { refetchOnWindowFocus: false, staleTime: 60000, 
        cacheTime: 10, })

    if (isLoading) return <Loader />
    if (isError) return <Fragment><h1>Oops something went wrong</h1><p>{error.message}</p></Fragment>

    const userDetails = { 
        id: user?.id,
        login: user?.login,
        avatar: data?.avatar_url,
        name: data?.name,
        bio: data?.bio,
        followers: data?.followers,
        following: data?.following,
        company: data?.company,
        location: data?.location,
        email: data?.email,
        blog: data?.blog,
        repos: data?.public_repos,
        gists: data?.public_gists,
    }

    return ( 
        rateLimit ? <RateLimit /> : <Grid item xs={4}>
            <Card key={user.id} variant="outlined">
                <Link to={{ pathname: `/user/${user?.id}`, state: { user: { userDetails }} }} style={{ textDecoration: "none"}}>
                    <CardContent>
                    <CardHeader
                        avatar={<Avatar alt="user avatar" src={data?.avatar_url} />}
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={data?.name}
                        subheader={user?.login}
                    />
                        <Typography color="primary" gutterBottom>
                            {data?.bio}
                        </Typography>
                        <CardRow align="center" color="textSecondary" variantMapping={{body1: "div"}}>
                            <PeopleOutlineOutlinedIcon /> 
                            <span>{`${data?.followers} followers`}</span>
                            <BulletPoint>•</BulletPoint>
                            <span>{`${data?.following} following`}</span>
                        </CardRow>
                        <CardRow color="textSecondary" variantMapping={{body1: "div"}}>
                            {data?.company ? <><BusinessOutlinedIcon /> {data.company}</> : null}
                        </CardRow>
                        <CardRow color="textSecondary" variantMapping={{body1: "div"}}>
                            {data?.location ? <><LocationOnOutlinedIcon /> {data.location}</> : null}
                        </CardRow>
                        <CardRow color="textSecondary" variantMapping={{body1: "div"}}>
                            {data?.email ? <><EmailOutlinedIcon /> {data.email}</> : null}
                        </CardRow>
                        <CardRow color="textSecondary" variantMapping={{body1: "div"}}>
                            {data?.blog ? <><LinkOutlinedIcon /> {data.blog}</> : null}
                        </CardRow>
                    </CardContent>
                </Link>
            </Card>
        </Grid>
    );
}

export default User;
