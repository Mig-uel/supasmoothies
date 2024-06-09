import supabase from '../config/supabaseClient'

const HomePage = () => {
  console.log(supabase)

  return (
    <div className='page home'>
      <h2>Home</h2>
    </div>
  )
}

export default HomePage
