import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'

// components
import SmoothieCard from '../components/smoothie-card.component'

const HomePage = () => {
  const [smoothies, setSmoothies] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select()

      if (error) {
        setFetchError(error.message)
        setSmoothies(null)
      }

      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }, [])

  return (
    <div className='page home'>
      {smoothies ? (
        <div className='smoothies'>
          {smoothies.map((smoothie) => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} />
          ))}
        </div>
      ) : (
        <p>{fetchError}</p>
      )}
    </div>
  )
}

export default HomePage
