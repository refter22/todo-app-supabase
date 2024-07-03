import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import ToDo from './feature/todo/ToDo'
import Auth from './feature/auth/Auth'
import UserInfo from './feature/auth/UserInfo'
import { supabase } from './supabase'
import './App.css'
import { Session } from '@supabase/supabase-js'

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null)

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
        {session && <UserInfo email={session.user?.email} />}
        {session ? <ToDo /> : <Auth />}
      </div>
    </Provider>
  )
}

export default App
