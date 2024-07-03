import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ToDo from './feature/todo/ToDo'
import Auth from './feature/auth/Auth'
import UserInfo from './feature/auth/UserInfo'
import { supabase } from './supabase'
import './App.css'
import { Session } from '@supabase/supabase-js'
import { useTheme } from './hooks/useTheme'
import ThemeToggleIcon from './components/icons/ThemeToggleIcon'

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Provider store={store}>
      <div className='App'>
        <button
          className='theme-toggle'
          onClick={toggleTheme}
          aria-label='Переключить тему'
        >
          <ThemeToggleIcon theme={theme} />
        </button>
        {session && <UserInfo email={session.user?.email} />}
        {session ? <ToDo /> : <Auth />}
      </div>
    </Provider>
  )
}

export default App
