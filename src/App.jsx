import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home'
import AddBook from './pages/Book/AddBook'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addbook' element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
