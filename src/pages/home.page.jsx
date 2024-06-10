import { useEffect, useState, lazy, Suspense } from 'react'
import supabase from '../config/supabaseClient'

// components
const SmoothieCard = lazy(() => import('../components/smoothie-card.component'))
import { RingLoader } from 'react-spinners'

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
    <Suspense fallback={<RingLoader color='#12bca2' />}>
      <div className='page home'>
        {smoothies ? (
          <div className='smoothies'>
            {/* order-by button */}
            <div className='smoothie-grid'>
              {smoothies.map((smoothie) => (
                <SmoothieCard key={smoothie.id} smoothie={smoothie} />
              ))}
            </div>
          </div>
        ) : (
          <p>{fetchError}</p>
        )}
      </div>
    </Suspense>
  )
}

export default HomePage
