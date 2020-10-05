import React, { useContext, useState, createContext, Fragment } from 'react';
import { useQuery } from 'react-query';

import axios from "axios";
import { Loader } from '../shared';

const RateLimitContext = createContext();

export function RateLimitContextProvider({ children }) {
    const [rateLimit, setRateLimit] = useState(false);

    const getRateLimit = async () => {
        const { data: { resources: { core: { remaining }, search: { remaining: searchRemaining } } } } = await axios.get('https://api.github.com/rate_limit')
        const result = (remaining === 0 || searchRemaining === 0)
        setRateLimit(result)
        return result
    }

    const { error, isLoading, isError } = useQuery('rateLimit', getRateLimit, { refetchOnWindowFocus: false })

    if (isLoading) return <Loader />
    if (isError) return <Fragment><h1>Oops something went wrong</h1><p>{error.message}</p></Fragment>
    
    return (
        <RateLimitContext.Provider
            value={{
                rateLimit,
                setRateLimit
            }}
        >
        {children}
        </RateLimitContext.Provider>
    );
}

export function useRateLimit() {
    const context = useContext(RateLimitContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}

