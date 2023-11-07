import React from 'react'
import SearchSection from '../home/SearchSection'
import GoogleMapSection from '../home/GoogleMapSection'

function CustomerDesign() {
  return (
    <div className='custom-parent'>
      <div className='custom-search'>
       <SearchSection/>
      </div>
      <div className="custom-child">
        <GoogleMapSection/>
      </div>
    </div>
  )
}

export default CustomerDesign