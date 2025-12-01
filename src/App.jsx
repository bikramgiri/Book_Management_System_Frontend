import React from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <>
    {/* <Navbar /> */}
      <RouterProvider router={router} />
    </>
  )
}

export default App;
