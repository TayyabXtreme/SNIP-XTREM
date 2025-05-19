import React, { useState } from 'react'
import LoginForm from '../components/login_form'
import RegisterForm from '../components/register_form'

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)

  const handleAuthSuccess = (data) => {
    if (onAuthSuccess) {
      onAuthSuccess(data)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {isLogin ? (
        <LoginForm onLoginSuccess={handleAuthSuccess} />
      ) : (
        <RegisterForm onRegisterSuccess={handleAuthSuccess} />
      )}
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  )
}

export default AuthPage