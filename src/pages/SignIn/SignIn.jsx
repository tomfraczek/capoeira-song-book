import React from 'react'
import Navigation from '../../components/Navigation'
import SignInForm from '../../components/SignInForm'

const SignIn = () => {
  return (
    <>
        <Navigation navType="signInForm"/>
        <SignInForm/>
    </>
  )
}

export default SignIn