import React from 'react'
import { Tilt } from 'react-tilt'
import icon from "../Logo/icons8-brain-100.png"

function Logo() {
  return (
    <div className='ma2 mt0 '>
    <Tilt  style={{ height: 100, width: 250 }}>
    <div className='tilt-inner '><img style={{paddingTop:"5px"}} src={icon} alt="" /></div>
  </Tilt>
  </div>
  )
}

export default Logo