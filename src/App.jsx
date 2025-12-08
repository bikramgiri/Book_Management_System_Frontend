import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import AddBook from './pages/Book/AddBook'
import Navbar from './components/navbar/Navbar'
import SingleBook from './pages/Book/SingleBook'

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/addbook' element={<AddBook />} />
        <Route path='/book/:id' element={<SingleBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
