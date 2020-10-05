import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 100px auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LimitMessage = styled.div`
    font-weight: 800;
    font-size: 3em;
`;

const RateLimit = () => {
    return (
        <Wrapper>
            <LimitMessage>Rate Limit reached. Please try again later</LimitMessage>
        </Wrapper>
    )
}

export default RateLimit