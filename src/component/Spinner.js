import React from 'react'

const Spinner = () => {
    return (
        <div className='spinner'>

           <div className='loading-frame'>
              <div className='spinner1' id='spinner1'></div>
              <div className='spinner2' id='spinner2'></div>
              <div className='spinner3' id='spinner3'></div>

           </div>
        </div>
    )
}

export default Spinner