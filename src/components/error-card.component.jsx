const ErrorCard = ({ error }) => {
  return (
    <div className='smoothie-card'>
      <h3>Error</h3>
      <p>{error?.message}</p>
    </div>
  )
}

export default ErrorCard
