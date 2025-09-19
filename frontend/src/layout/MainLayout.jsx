import React from 'react' 
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
const MainLayout = () => {
  return <>
  <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>  <Navbar/> <Hero/> <LatestCollection/>
 
  
  
  </div>

    
  </>
}

export default MainLayout