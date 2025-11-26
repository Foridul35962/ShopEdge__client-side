import { AiOutlineClose } from 'react-icons/ai';
import CartContent from './CartContent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchCart } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify'

const CartDrawer = ({ drawer, setDrawer }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { cart, error } = useSelector((state) => state.cart)

    useEffect(() => {
        if (user) {
            dispatch(fetchCart())
        }
    }, [user])


    const handleCheckOut = () => {
        setDrawer(false)
        if (!user) {
            navigate('/login')
        } else {
            if (cart.length>0) {
                navigate('/checkout')
            } else{
                toast.warning('purchase some product')
                navigate('/collections/all')
            }
        }
    }

    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-2/3 md:w-1/3 lg:1/4 h-full bg-gray-300 dark:bg-gray-800 shadow-2xl transform transition-all duration-300 flex flex-col z-50 ${drawer ? 'translate-x-0' : 'translate-x-full'}`}>
            <button className='flex justify-end p-4'>
                <AiOutlineClose className='text-black dark:text-white cursor-pointer size-6' onClick={() => setDrawer(!drawer)} />
            </button>

            <div className='grow w-full p-4 overflow-y-auto text-black dark:text-white'>
                <h2 className='text-2xl pb-4 font-semibold'>Your Cart</h2>
                <CartContent cart={cart} />
            </div>

            <div className='flex flex-col gap-2 p-4 sticky bottom-0'>
                <button
                    onClick={handleCheckOut}
                    className='w-full bg-blue-800 text-white text-center text-lg rounded-lg py-1.5 cursor-pointer hover:bg-blue-900 active:bg-blue-950 transform transition-all duration-300'>
                    Check Out
                </button>
                <p className='text-sm text-center text-black dark:text-gray-300 tracking-tight'>Shipping, taxes and discount code calculated at checked</p>
            </div>
        </div>
    )
}

export default CartDrawer