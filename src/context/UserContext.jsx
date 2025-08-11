import axios from 'axios'
import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  async function getUser() {
    try {
      const token = localStorage.getItem('token')

      if (token) {
        const response = await axios.get(
          'https://linked-posts.routemisr.com/users/profile-data',
          {
            headers: {
              token: token,
            },
          }
        )

        if (response.data.message === 'success') {
          setUser(response.data.user)
        } else {
          console.error('Failed to fetch user data:', response.data.message)
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser,getUser }}>
      {children}
    </UserContext.Provider>
  )
}
