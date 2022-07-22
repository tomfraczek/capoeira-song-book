import React from 'react'
import Navigation from '../../components/Navigation'
import SignInForm from '../../components/SignInForm'

const SignIn = () => {
  return (
    <>
        <Navigation NavType="SignInForm"/>
        <SignInForm/>
    </>
  )
}

export default SignIn