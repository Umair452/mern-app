
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
    <>
    <ToastContainer />
     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/create' element={<CreatePage />} />
      
     </Routes>
    
    </>
  )
}

export default App
