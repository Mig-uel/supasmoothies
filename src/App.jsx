import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div className='page home'>
      <nav>
        <h1>Supa Smoothies</h1>
        <Link to='/'>Home</Link>
        <Link to='/create'>Create New Smoothie</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
