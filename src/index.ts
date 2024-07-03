import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    React.createElement(React.StrictMode, null, React.createElement(App, null))
  )
} else {
  console.error('Корневой элемент не найден')
}
