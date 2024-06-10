import { useEffect, useState, lazy, Suspense } from 'react'
import supabase from '../config/supabaseClient'
import { Link } from 'react-router-dom'

// components
const SmoothieCard = lazy(() => import('../components/smoothie-card.component'))
const ErrorCard = lazy(() => import('../components/error-card.component'))
import { RingLoader } from 'react-spinners'

const HomePage = () => {
  const [smoothies, setSmoothies] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from('smoothies').select()

      if (error) {
        setFetchError(error)
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
                <Link to={`/update/${smoothie.id}`}>
                  <SmoothieCard key={smoothie.id} smoothie={smoothie} />
                </Link>
              ))}
            </div>
          </div>
        ) : fetchError ? (
          <Suspense fallback={<RingLoader color='#12bca2' />}>
            <ErrorCard error={fetchError} />
          </Suspense>
        ) : (
          <></>
        )}
      </div>
    </Suspense>
  )
}

export default HomePage
