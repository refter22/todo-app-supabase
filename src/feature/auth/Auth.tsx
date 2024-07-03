import React, { useState } from 'react'
import { supabase } from '../../supabase'
import styles from './Auth.module.css'
import Loader from '../../components/Loader/Loader'

const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) setMessage(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Регистрация успешна! Проверьте вашу почту.')
    }

    setLoading(false)
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setMessage('')
  }

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleAuth} className={styles.form}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type='submit' disabled={loading} className={styles.button}>
          {loading ? <Loader /> : isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <button onClick={toggleAuthMode} className={styles.toggleButton}>
        {isLogin ? 'Перейти к регистрации' : 'Перейти ко входу'}
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}

export default Auth
