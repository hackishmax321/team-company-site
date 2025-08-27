import React from 'react'
import Header from '../layout/header/Header'
import Brands from '../layout/brands/Brands'
import ProjectsCounter from '../layout/counter/ProjectsCounter'
import ContactUs from './ContactUs'
import CompanyInfo from '../layout/company/Company'
import Services from './Services'

function Home() {
  return (
    <>
    <Header />
    {/* <Brands /> */}
    <Services />
    <ProjectsCounter />
    <CompanyInfo />
    <ContactUs />
    </>
  )
}

export default Home