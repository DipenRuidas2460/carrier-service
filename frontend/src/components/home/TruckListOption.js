import React from 'react'
import { TruckListData } from '../../utils/TruckListData'
import TruckListItem from './TruckListItem'

function TruckListOption() {
  return (
    <div className='truck-list-option'>
      <h2>Recommeded</h2>
      {
        TruckListData.map((item, i)=>(
           <div key={i}>
            <TruckListItem truck={item}/>
           </div>
        ))
      }
    </div>
  )
}

export default TruckListOption
