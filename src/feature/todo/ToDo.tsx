import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import {
  addTodo,
  updateTodo,
  deleteTodo,
  setPage,
  setFilter,
  updateCurrentPage
} from '../../store/todoSlice'
import { fetchTodos } from '../../store/todoActions'
import { todoApi } from '../../api/todoApi'
import ToDoForm from './ToDoForm'
import ToDoItem from './ToDoItem'
import styles from './ToDo.module.css'
import Loader from '../../components/Loader/Loader'

const ToDo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { todos, status, error, currentPage, totalPages, filter } = useSelector(
    (state: RootState) => state.todos
  )

  useEffect(() => {
    dispatch(fetchTodos(currentPage, filter))
  }, [dispatch, currentPage, filter, totalPages])

  const handleAddTodo = async (text: string) => {
    try {
      const newTodo = await todoApi.addTodo(text)
      if (newTodo) {
        dispatch(addTodo(newTodo))
        if (filter !== 'all' && filter !== 'active') {
          dispatch(updateCurrentPage())
        }
      } else {
        throw new Error('Не удалось добавить задачу')
      }
    } catch (err) {
      console.error('Ошибка при добавлении задачи:', err)
    }
  }

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { completed })
      dispatch(updateTodo(updatedTodo))
      dispatch(updateCurrentPage())
    } catch (err) {
      console.error('Ошибка при обновлении задачи:', err)
    }
  }

  const handleArchiveTodo = async (id: number) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { archived: true })
      dispatch(updateTodo(updatedTodo))
      dispatch(updateCurrentPage())
    } catch (err) {
      console.error('Ошибка при архивировании задачи:', err)
    }
  }

  const handleUnarchiveTodo = async (id: number) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, { archived: false })
      dispatch(updateTodo(updatedTodo))
      dispatch(updateCurrentPage())
    } catch (err) {
      console.error('Ошибка при разархивировании задачи:', err)
    }
  }

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id)
      dispatch(deleteTodo(id))
      dispatch(updateCurrentPage())
    } catch (err) {
      console.error('Ошибка при удалении задачи:', err)
    }
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  const handleFilterChange = (
    newFilter: 'all' | 'active' | 'completed' | 'archived'
  ) => {
    dispatch(setFilter(newFilter))
  }

  return (
    <div className={styles.todoContainer}>
      <h1 className={styles.title}>Список дел</h1>
      <ToDoForm addTodo={handleAddTodo} />
      <div className={styles.filters}>
        <button
          onClick={() => handleFilterChange('active')}
          className={filter === 'active' ? styles.activeFilter : ''}
        >
          Активные
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={filter === 'completed' ? styles.activeFilter : ''}
        >
          Завершенные
        </button>
        <button
          onClick={() => handleFilterChange('archived')}
          className={filter === 'archived' ? styles.activeFilter : ''}
        >
          Архивные
        </button>
        <button
          onClick={() => handleFilterChange('all')}
          className={filter === 'all' ? styles.activeFilter : ''}
        >
          Все
        </button>
      </div>
      <div className={styles.todoListContainer}>
        {status === 'loading' ? (
          <Loader />
        ) : status === 'failed' ? (
          <div className={styles.error}>Ошибка: {error}</div>
        ) : (
          <ul className={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo.id}>
                <ToDoItem
                  todo={todo}
                  toggleTodo={handleToggleTodo}
                  archiveTodo={handleArchiveTodo}
                  unarchiveTodo={handleUnarchiveTodo}
                  deleteTodo={handleDeleteTodo}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className={styles.paginationButton}
          aria-label='Предыдущая страница'
        >
          &#8592; Назад
        </button>
        <span className={styles.pageInfo}>
          Страница {currentPage + 1} из {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className={styles.paginationButton}
          aria-label='Следующая страница'
        >
          Вперед &#8594;
        </button>
      </div>
    </div>
  )
}

export default ToDo
