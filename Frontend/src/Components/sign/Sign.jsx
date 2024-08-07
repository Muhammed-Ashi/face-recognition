import React, { useEffect, useState } from 'react'
import "./Sign.css"
import axios from "axios"


function Sign({ onRouteChange }) {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [Error, setError] = useState("")
  
  const submitForm = async (e) => {

    console.log("SUBMITTED")
    e.preventDefault();
    axios.post("https://facedetector.top/api/user/login", { username, password })
      .then((response) => {
        console.log(response)
        console.log('are you')
        onRouteChange("Home")
      })
      .catch((error) => {
        let Error = error.response.data.error
             if (Error === undefined){
               setError("something went wrong please try again later")
             }else{
              setError(Error)
             }
     
        console.log(Error,"error is working")
      })
      
  }

  return (
    <div>
      <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main class="pa4 black-80">
          <form class="" onSubmit={submitForm} >
            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
              <legend class="f4 fw6 ph0 mh0">Sign In</legend>
              {Error && <p>{Error}</p>}
              <div class="mt3">
                <label class="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email"
                 name="email-address" id="email-address" onChange={(e)=> {setusername(e.target.value)}} />
              </div>
              <div class="mv3">
                <label class="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                 type="password" name="password" id="password" onChange={(e)=> {setpassword(e.target.value)}} />
              </div>
              <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
            </fieldset>
            <div class="">
              <input
                class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                value="Sign in"
                />
            </div>
            <div class="lh-copy mt3">
              <a href="#0" class="f6 link dim black db">Sign up</a>
              <a href="#0" class="f6 link dim black db">Forgot your password?</a>
            </div>
          </form>
        </main>
      </article>
    </div>
  )
}

export default Sign