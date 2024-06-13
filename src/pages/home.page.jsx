import { useEffect, useState, lazy, Suspense } from 'react'
import supabase from '../config/supabaseClient'

// components
const SmoothieCard = lazy(() => import('../components/smoothie-card.component'))
const ErrorCard = lazy(() => import('../components/error-card.component'))
import { RingLoader } from 'react-spinners'

const HomePage = () => {
  const [smoothies, setSmoothies] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const onDelete = (id) => {
    setSmoothies((oldSmoothies) =>
      oldSmoothies.filter((oldSmoothie) => oldSmoothie.id !== id)
    )
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, { ascending: false })

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
  }, [orderBy])

  return (
    <Suspense fallback={<RingLoader color='#12bca2' />}>
      <div className='page home'>
        {smoothies ? (
          <div className='smoothies'>
            <div className='order-by'>
              <p>Order by:</p>
              <button onClick={() => setOrderBy('created_at')}>
                Time Created
              </button>
              <button onClick={() => setOrderBy('title')}>Title</button>
              <button onClick={() => setOrderBy('rating')}>Rating</button>
            </div>
            <div className='smoothie-grid'>
              {smoothies.map((smoothie) => (
                <SmoothieCard
                  key={smoothie.id}
                  smoothie={smoothie}
                  onDelete={onDelete}
                />
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
