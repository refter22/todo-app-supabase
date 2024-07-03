import { User } from '@supabase/supabase-js'
import { supabase } from '../supabase'

export interface Todo {
  id: number
  user_id: string
  text: string
  completed: boolean
  archived: boolean
}

export const todoApi = {
  async register(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data.user
  },

  async login(email: string, password: string): Promise<User | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data.user
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getTodos(
    page: number,
    status: 'all' | 'active' | 'completed' | 'archived'
  ): Promise<{
    todos: Todo[]
    totalCount: number | null
    currentPage: number
  }> {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Пользователь не авторизован')

    const pageSize = 10
    let start = page * pageSize
    let end = start + pageSize - 1

    let query = supabase
      .from('todos')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)

    if (status !== 'all') {
      if (status === 'active') {
        query = query.eq('completed', false).eq('archived', false)
      } else if (status === 'completed') {
        query = query.eq('completed', true).eq('archived', false)
      } else if (status === 'archived') {
        query = query.eq('archived', true)
      }
    }

    const { count } = await query

    if (count !== null) {
      const totalPages = Math.ceil(count / pageSize)
      if (page >= totalPages) {
        page = Math.max(0, totalPages - 1)
        start = page * pageSize
        end = start + pageSize - 1
      }
    }

    const { data, error } = await query.range(start, end)
    if (error) throw error
    return { todos: data, totalCount: count, currentPage: page }
  },

  async addTodo(text: string): Promise<Todo | undefined> {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) throw new Error('Пользователь не авторизован')

    const { data, error } = await supabase
      .from('todos')
      .insert({ text, completed: false, archived: false, user_id: user.id })
      .select()
    if (error) throw error
    return data?.[0]
  },

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
    if (error) throw error
    if (!data || data.length === 0) {
      throw new Error('Задача не найдена')
    }
    return data[0]
  },

  async deleteTodo(id: number): Promise<void> {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (error) throw error
  }
}
