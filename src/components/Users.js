import React from 'react';
import { Grid } from '@material-ui/core';
import User from './User';

const Users = ({ users }) => {

    return (    
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                {users.map(user => (
                    <User key={user.id} user={user} />
                ))}
            </Grid>
        </Grid>
    );
}

export default Users;
