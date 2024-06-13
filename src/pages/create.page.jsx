import { useState } from 'react'
import supabase from '../config/supabaseClient'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState(0)
  const [formError, setFormError] = useState(null)

  const navigate = useNavigate()

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill out all fields!')
      return
    }

    try {
      const { data, error } = await supabase
        .from('smoothies')
        .insert([{ title, method, rating }])
        .select()

      if (error) {
        throw new Error('Cannot create a new smoothie (Unauthorized)')
      }

      setTitle('')
      setMethod('')
      setRating(0)
      setFormError(null)
      navigate('/')
    } catch (error) {
      setFormError(error.message)
    }
  }

  return (
    <div className='page create'>
      <form onSubmit={submitHandler}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor='method'>Method:</label>
        <input
          type='text'
          id='method'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor='title'>Rating:</label>
        <input
          type='number'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button type='submit'>Create Smoothie Recipe</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePage
