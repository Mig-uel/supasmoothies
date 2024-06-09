import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main>
      <nav>
        <h1>Supa Smoothies</h1>
        <Link to='/'>Home</Link>
        <Link to='/create'>Create New Smoothie</Link>
      </nav>
      <Outlet />
    </main>
  )
}

export default App
