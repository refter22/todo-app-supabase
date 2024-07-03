import React, { useState, FormEvent } from 'react'
import styles from './ToDoForm.module.css'

interface ToDoFormProps {
  addTodo: (text: string) => void
}

const ToDoForm: React.FC<ToDoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text.trim()) return
    addTodo(text)
    setText('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Добавить новую задачу'
      />
      <button className={styles.button} type='submit'>
        Добавить
      </button>
    </form>
  )
}

export default ToDoForm
