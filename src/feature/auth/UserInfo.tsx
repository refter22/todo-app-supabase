import React from 'react'
import { supabase } from '../../supabase'
import styles from './UserInfo.module.css'

interface UserInfoProps {
  email: string | undefined
}

const UserInfo: React.FC<UserInfoProps> = ({ email }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className={styles.userInfo}>
      <span className={styles.email}>{email}</span>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Выйти
      </button>
    </div>
  )
}

export default UserInfo
