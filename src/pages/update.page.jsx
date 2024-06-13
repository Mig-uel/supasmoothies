import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const UpdatePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState(0)
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }

      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchSmoothie()
  }, [id, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill out all fields!')
      return
    }

    try {
      const { data, error } = await supabase
        .from('smoothies')
        .update({ title, method, rating })
        .eq('id', id)
        .select()

      if (data.length === 0 || error) {
        throw new Error(
          error?.message || 'Cannot update smoothie (Unauthorized)'
        )
      }

      setFormError(null)
      navigate('/')
    } catch (error) {
      setFormError(error.message)
    }
  }

  return (
    <div className='page update'>
      <form onSubmit={submitHandler}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor='title'>Method:</label>
        <input
          type='text'
          id='method'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor='rating'>Rating:</label>
        <input
          type='number'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button type='submit'>Update Smoothie</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default UpdatePage
