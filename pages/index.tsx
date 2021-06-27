import React from 'react'
import Head from 'next/head'
import fetchAllData from '@/fetchers/fetchAllData'
import ProductsGrid from '@/components/ProductsGrid'
import { GetServerSideProps } from 'next'
import Header from '@/components/Header/Header'

export const getServerSideProps: GetServerSideProps = async () => {
  const storeState = await fetchAllData()
  return {
    props: { storeState },
  }
}

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Nakukop Test Application</title>
        <meta name="description" content="This application uses React, TS, ChakraUI & Storeon" />
      </Head>
      <Header />
      <main>
        <ProductsGrid />
      </main>
    </div>
  )
}
