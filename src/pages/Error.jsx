import Lottie from 'lottie-react'
import Error404 from '../assets/Error 404.json'

const Error = () => {
  return (
    <div className='h-100 lg:h-dvh'>
      <Lottie animationData={Error404} className='h-100 lg:h-dvh'></Lottie>
    </div>
  )
}

export default Error