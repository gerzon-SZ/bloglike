import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../utils/usecontext'
import SignUp from '../pages/Signup'
import SignIn from '../pages/SignIn'
import SignInSide from '../pages/SignInSide'
import './App.css'

function App() {
  return (
    <AuthProvider>  
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signinside" element={<SignInSide />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
