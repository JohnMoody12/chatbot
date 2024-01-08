import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import Chat from './pages/Chat'

function App() {

  return (
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/chat" element={<Chat />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </main>
    
  )
}

export default App
