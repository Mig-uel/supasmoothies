import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const UpdatePage = () => {
  const { id } = useParams()
  const [smoothie, setSmoothie] = useState(null)

  return (
    <div className='page update'>
      <h2>Update</h2>
    </div>
  )
}

export default UpdatePage
