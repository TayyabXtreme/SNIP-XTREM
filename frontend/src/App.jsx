
import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import axiosInstance from './utils/axiosIntance'
import { logoutUser } from './api/user.api'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already authenticated on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make a request to an endpoint that requires authentication
        // The server will check the cookie and return user data if valid
        const response = await axiosInstance.get('/api/auth/me')
        setUser(response.data)
        setIsAuthenticated(true)
      } catch (error) {
        // If the request fails, the user is not authenticated
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <div>
          <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">URL Shortener</h1>
            <button 
              onClick={handleLogout}
              className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
          <HomePage user={user} />
        </div>
      ) : (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  )
}

export default App

