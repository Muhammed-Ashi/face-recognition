import React from 'react'
import { useState  } from 'react'
import axios from 'axios'


function Signup({ onRouteChange }) {
 

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [Error, seterror] = useState("")
  const [formValidation, setformValidation] = useState("")

  console.log(username, password)

  const submitForm = (e) => {
    e.preventDefault()
    console.log("yes iam working form ")
    // checking input fields are filled or not
    if (!username) {
      setformValidation("Username is Required")
      console.log(username, "form validation")
    }
    if (!password) {
      setformValidation("Password is Required")
      console.log(password, "form validation")
    }

    if (!username && !password) {
      setformValidation("username and password is required")
    }

    if (password && username) {
      RegisterUser()
    }


  }



  const RegisterUser = () => {

    axios.post('https://facedetector.top/api/user/register', { username, password })
      .then((response) => {
        console.log(response)
       onRouteChange('Home')
      
      })
      .catch((error) => {
        console.log(error.response.data.error, "register error")
        let Error = error.response.data.error
        if (Error === undefined) {
          seterror("something went wrong please try again later")
        } else {
          seterror(Error)
        }

      })

  }

  return (
    <div>
      <div>
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
          <main className="pa4 black-80">
            <form className="" onSubmit={submitForm}>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                {formValidation && <p>{formValidation}</p>}
                {Error && <p>{Error}</p>}
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email" name="email-address" id="email-address" onChange={(e) => { setusername(e.target.value) }} />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password" name="password" id="password" onChange={(e) => { setpassword(e.target.value) }} />
                </div>

              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                  value="Sign in"
                />
              </div>

            </form>
          </main>
        </article>
      </div>
    </div>
  )
}

export default Signup