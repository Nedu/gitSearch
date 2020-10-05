import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
    margin-bottom: 3em;
`;

const PageCount = styled.div`
    font-size: 2em;
`;

const Pagination = ({ currentPage, handlePrev, handleNext, hasMore, totalPages }) => {

    return (
        <Wrapper>
            <PageCount>Viewing page {currentPage} of {totalPages} pages</PageCount>
            <div>
                <Button variant="contained" onClick={handlePrev} disabled={currentPage === 1}>Previous Page</Button>{' '}
                <Button variant="contained" onClick={handleNext} disabled={hasMore}>Next Page</Button>
            </div>
        </Wrapper>
    );
}

export default Pagination;
