import React from 'react'
import Header from '../layout/header/Header'
import Brands from '../layout/brands/Brands'
import ProjectsCounter from '../layout/counter/ProjectsCounter'
import ContactUs from './ContactUs'
import CompanyInfo from '../layout/company/Company'

function Home() {
  return (
    <>
    <Header />
    <Brands />
    <ProjectsCounter />
    <CompanyInfo />
    <ContactUs />
    </>
  )
}

export default Home