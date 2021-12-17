import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import requests from '../utils/requests'
import Thumbnail from '../components/Thumbnail'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'
import { useRouter } from 'next/router'


export default function Home({ results }) {
  const [movies, setMovies] = useState(results);
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setpageNo] = useState(2);

  const router = useRouter()
  
  const getMoreMovies = async() => {
    const request = await fetch(
      `https://api.themoviedb.org/3${requests[router.query.genre]?.url || requests.fetchTrendingMovies.url
      }&page=${pageNo}`
    )

    const newMovies = await request.json();
    if(!newMovies.results){
      setHasMore(false)
    }
    else{
      setMovies([...movies, ...newMovies.results]);
      setpageNo(pageNo + 1)
    }
  }

  return (
    <div>
      <Head>
        <title> Hulu </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Nav />
      <InfiniteScroll
      dataLength={movies.length}
      next={getMoreMovies}
      hasMore={hasMore}
      loader={<h4> Loading... </h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }>
        <div className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
              {movies.map((movie) => (
                <Thumbnail key={movie.id} result={movie}/>
              ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrendingMovies.url
    }&page=1`
  )

  const response = await request.json()
  return {
    props: {
      results: response.results
    }
  }
}