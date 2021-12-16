import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import requests from '../utils/requests'
import Result from '../components/Results';

export default function Home({ results }) {
  console.log("RESULT ===> ", results)
  return (
    <div>
      <Head>
        <title> Hulu </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Nav />
      <Result results={results} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrendingMovies.url
    }`
  )
  console.log("URL ===> ", request.url)
  const response = await request.json()
  console.log("RESPONSE ===> ", response)
  return {
    props: {
      results: response.results
    }
  }
}