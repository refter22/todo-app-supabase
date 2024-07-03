import { AppDispatch } from './store'
import {
  setTodos,
  setStatus,
  setError,
  setTotalPages,
  setPage
} from './todoSlice'
import { todoApi } from '../api/todoApi'

export const fetchTodos =
  (currentPage: number, filter: 'all' | 'active' | 'completed' | 'archived') =>
  async (dispatch: AppDispatch) => {
    dispatch(setStatus('loading'))
    try {
      const {
        todos,
        totalCount,
        currentPage: actualPage
      } = await todoApi.getTodos(currentPage, filter)
      dispatch(setTodos(todos))
      dispatch(setTotalPages(Math.ceil((totalCount ?? 0) / 10)))
      dispatch(setPage(actualPage))
      dispatch(setStatus('succeeded'))
    } catch (err) {
      dispatch(setError((err as Error).message))
      dispatch(setStatus('failed'))
    }
  }
