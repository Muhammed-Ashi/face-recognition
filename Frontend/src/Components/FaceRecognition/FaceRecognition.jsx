import React from 'react'
import "./FaceRecognition.css"
function FaceRecognition({imageUrl,box}) {
  console.log(box)
  return (
    <div className='center'>
        <div className='absolute mt2'>
         <img id='input_image' src={imageUrl} alt="" style={{width:"300px",height:"auto"}} />
         <div className='bounding_box' style={{top:box.topRow,right:box.rightCol, 
          bottom:box.bottomRow,left:box.leftCol}}></div>
         </div>
    </div>
  )
}

export default FaceRecognition