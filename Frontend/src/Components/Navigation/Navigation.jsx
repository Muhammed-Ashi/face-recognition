import React from 'react'

function Navigation({onRouteChange , isSignedIn}) {
   
  if (isSignedIn === false) {
    return (
      <div>
          <nav style={{display:"flex",justifyContent:"flex-end"}}>
              <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange("signin")}>Sign in</p>
              <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange("signup")}>Register</p>
                      </nav>
      </div>
    )
  }else{
    return(
      <div>
      <nav style={{display:"flex",justifyContent:"flex-end"}}>
          <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange("signout")}>Sign out</p>

                  </nav>
  </div>
      
    )
  }


}

export default Navigation