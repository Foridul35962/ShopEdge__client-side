import LoadingVideo from '../../assets/Loading.webm'

const Loading = () => {
    return (
        <div className='bg-white text-4xl flex items-center justify-center h-screen w-full'>
            <video muted autoPlay loop src={LoadingVideo}></video>
        </div>
    )
}

export default Loading