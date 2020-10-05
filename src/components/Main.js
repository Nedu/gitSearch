import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useQueryCache, usePaginatedQuery } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import SearchForm from '../shared/views/SearchForm';
import Users from './Users';
import { Loader, Pagination, RateLimit } from '../shared';
import { useRateLimit } from '../contexts/RateLimit'

const Wrapper = styled.div`
    height: 100vh;
    width: 75%;
    margin: 0 auto;
`;

const ContentWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    min-height: 100vh;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const Heading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
`;

const HeadingTitle = styled.h1`
    color: #000;
`;

const ResultsCount = styled.div`
    font-weight: 700;
    margin: 1em;
`;

const PER_PAGE = 9

const Main = () => {
    const cache = useQueryCache()
    const [searchPhrase, setSearchPhrase] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [page, setPage] = useState(1)
    const { rateLimit, setRateLimit } = useRateLimit()

    const searchByUser = useCallback(async (key, page = 1) => {
        try {
            const { data, headers } = await axios.get(`https://api.github.com/search/users?q=${searchPhrase}&per_page=${PER_PAGE}&page=${page}`)
            let hasMore = false;
            let maxPage;
            const link = headers?.link;
            const lastPage = link && link.split(',')
    
            // eslint-disable-next-line array-callback-return
            lastPage && lastPage.map((item) => {
                if(item.includes('next')) {
                    hasMore = true;
                } else if (item.includes('last')) {
                    const strSlice = item.trim().slice(item.lastIndexOf('&'))
                    const strSlice2 = strSlice.slice(0, strSlice.lastIndexOf(';') + 1)
                    const strSlice3 = strSlice2.trim().slice(strSlice2.lastIndexOf('=') + 1)
                    const strSlice4 = strSlice3.trim().slice(0, strSlice3.lastIndexOf('>'))
                    maxPage = Number(strSlice4);
                }
            })
    
            return { data, hasMore, maxPage }

        } catch (err) {
            const { response } = err;

            if (response?.status === 403) {
                setRateLimit(true)
            }
        }
    }, [searchPhrase, setRateLimit])

    const {
        isLoading,
        isError,
        error,
        resolvedData,
        latestData,
        isFetching,
        refetch
    } = usePaginatedQuery(['users', page], searchByUser, { refetchOnWindowFocus: false, enabled: false, staleTime: 60000, 
        cacheTime: 10,
        onSuccess: () => console.log('data fetched successfully') 
    })

    // Prefetch the next page
    useEffect(() => {
        if (latestData?.hasMore) {
            cache.prefetchQuery(['users', page + 1], searchByUser)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latestData, searchByUser, page])


    const handleSubmit = async (event) => {
        event.preventDefault()
        refetch()
        setShowResults(true)
    }

    const handleChange = event => {
        const { value } = event.target
        setSearchPhrase(value)
    }

    const handlePrev = (event, newPage) => {
        setPage(old => Math.max(old - 1, 0))
    };

    const handleNext = (event, newPage) => {
        setPage(old => (!latestData || !latestData.hasMore ? old : old + 1))
    };

    if (isLoading) return <Loader />
    if (isError) return <Fragment><h1>Oops something went wrong</h1><p>{error.message}</p></Fragment>

    return (
        rateLimit ? <RateLimit /> : <Wrapper>
            <ContentWrapper>
                <Content>
                    {!showResults && <Heading>
                        <SearchIcon />
                        <HeadingTitle>Search</HeadingTitle>
                    </Heading> }
                    <SearchForm searchPhrase={searchPhrase} handleChange={handleChange} handleSubmit={handleSubmit} />
                    {showResults && 
                        <>
                            <ResultsCount>Found {latestData?.maxPage * PER_PAGE} results</ResultsCount>
                            <Users users={resolvedData?.data?.items} />
                            <Pagination currentPage={page} totalPages={latestData?.maxPage} handlePrev={handlePrev} handleNext={handleNext} hasMore={!latestData || !latestData.hasMore} />
                        </>
                    }
                </Content>
                {isFetching && <Loader />}
            </ContentWrapper>
        </Wrapper>
    );
}

export default Main;
