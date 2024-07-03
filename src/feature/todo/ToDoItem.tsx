import React, { Component } from 'react'
import styles from './ToDoItem.module.css'

interface ToDoItemProps {
  todo: {
    id: number
    text: string
    completed: boolean
    archived: boolean
  }
  toggleTodo: (id: number, completed: boolean) => void
  archiveTodo: (id: number) => void
  unarchiveTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

class ToDoItem extends Component<ToDoItemProps> {
  handleToggle = (e: React.MouseEvent) => {
    const { todo, toggleTodo } = this.props
    if (!todo.archived) {
      toggleTodo(todo.id, !todo.completed)
    }
  }

  render() {
    const { todo, deleteTodo, archiveTodo, unarchiveTodo } = this.props
    return (
      <div
        className={`${styles.item} ${todo.archived ? styles.archived : ''}`}
        onClick={this.handleToggle}
      >
        <div className={styles.todoContent}>
          <input
            className={styles.checkbox}
            type='checkbox'
            checked={todo.completed}
            onChange={() => this.props.toggleTodo(todo.id, !todo.completed)}
            disabled={todo.archived}
          />
          <span
            className={`${styles.text} ${
              todo.completed ? styles.completed : ''
            }`}
          >
            {todo.text}
          </span>
        </div>
        <div className={styles.buttons}>
          {!todo.archived ? (
            <button
              className={styles.archiveButton}
              onClick={(e) => {
                e.stopPropagation()
                archiveTodo(todo.id)
              }}
            >
              Архивировать
            </button>
          ) : (
            <button
              className={styles.unarchiveButton}
              onClick={(e) => {
                e.stopPropagation()
                unarchiveTodo(todo.id)
              }}
            >
              Разархивировать
            </button>
          )}
          {todo.archived && (
            <button
              className={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation()
                deleteTodo(todo.id)
              }}
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default ToDoItem
