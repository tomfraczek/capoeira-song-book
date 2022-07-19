// import { useState } from 'react';
// import SignUpForm from '../../components/SignUpForm/SignUpForm';
// import SignInForm from '../../components/SignInForm/SignInForm';
// import { Link } from '@mui/material';
// import { Container } from '@mui/system';
// import Navigation from '../../components/Navigation/Navigation';

// const Authentication = () => {
//     const [showSignUpForm, setShowSignUpForm] = useState(false);
//     return (
//         <div>
//             {showSignUpForm ? (
//                  <>
//                     <SignUpForm /> 
//                      <Container>
//                         Already have an account? <Link onClick={() => setShowSignUpForm(false)}>Log in</Link>
//                     </Container> 
//                  </> 
//             ) : (
//                 <>
//                     <SignInForm />
//                     <Container>
//                         Don't have an account yet?{' '}
//                         <Link onClick={() => setShowSignUpForm(true)}>Sign up</Link>
//                     </Container>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Authentication;
