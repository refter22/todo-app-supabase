import React, { Component, FormEvent } from 'react'
import styles from './ToDoForm.module.css'

interface ToDoFormProps {
  addTodo: (text: string) => void
}

interface ToDoFormState {
  text: string
}

class ToDoForm extends Component<ToDoFormProps, ToDoFormState> {
  constructor(props: ToDoFormProps) {
    super(props)
    this.state = {
      text: ''
    }
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!this.state.text.trim()) return
    this.props.addTodo(this.state.text)
    this.setState({ text: '' })
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          className={styles.input}
          type='text'
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
          placeholder='Добавить новую задачу'
        />
        <button className={styles.button} type='submit'>
          Добавить
        </button>
      </form>
    )
  }
}

export default ToDoForm
