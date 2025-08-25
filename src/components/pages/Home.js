import React from 'react'
import Header from '../layout/header/Header'
import Brands from '../layout/brands/Brands'
import ProjectsCounter from '../layout/counter/ProjectsCounter'

function Home() {
  return (
    <>
    <Header />
    <ProjectsCounter />
    <Brands />
    </>
  )
}

export default Home