import supabase from '../config/supabaseClient'
import { Link } from 'react-router-dom'

const SmoothieCard = ({ smoothie }) => {
  const deleteHandler = async () => {
    const { data, error } = await supabase
      .from('smoothies')
      .delete()
      .eq('id', smoothie.id)
      .select()
  }

  return (
    <div className='smoothie-card'>
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className='rating'>{smoothie.rating}</div>
      <div className='buttons'>
        <Link to={`/update/${smoothie.id}`}>
          <i className='material-icons'>edit</i>
        </Link>
        <i className='material-icons' onClick={deleteHandler}>
          delete
        </i>
      </div>
    </div>
  )
}

export default SmoothieCard
