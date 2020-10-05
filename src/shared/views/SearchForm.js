import React from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

const Form = styled.form`
    display: flex;
    margin-top: 2em;
    margin-bottom: 2em;
    justify-content: center;
`;

const SubmitButton = styled(Button)`
  margin-left: 1em;
`;

const SearchForm = ({ handleChange, handleSubmit, searchPhrase }) => {
    return (
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Search Github Users" variant="outlined" onChange={handleChange} value={searchPhrase} />
            <SubmitButton type="submit" variant="contained">Search</SubmitButton>
        </Form>
    );
}

export default SearchForm;
