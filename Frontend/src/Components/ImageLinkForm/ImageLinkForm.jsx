import React from 'react'
import './ImageLinkForm.css'
function ImageLinkForm({onInputChange,onButtonSubmit}) {
    return (
        <div>
            <p className='f5'id='name'>
                {"This magic brain will detect faces in your pictures. Git it a try"}
            </p>
            <div className='center'>
             <div className=' center pa4 br3 shadow-2'>
                <input className='f4 pa2 w-70 center ' type="text" onChange={onInputChange} />
                <button className='w-30 grow f4 link ph3 pv2 dib black bg-dark'id='detect_button' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm