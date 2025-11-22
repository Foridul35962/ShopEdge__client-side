import React, { useState } from 'react'
import Design from '../components/forgetPassword/Design'
import VerifyPasswordOtp from '../components/forgetPassword/VerifyPasswordOtp'
import ResetPassword from '../components/forgetPassword/ResetPassword'

const ForgetPass = () => {
    const [email, setEmail] = useState('')
    const [verified, setVerified] = useState(false)
    return (
        <div>
            {
                !email ? <Design setEmail={setEmail} /> :
                    (!verified ? <VerifyPasswordOtp email={email} setVerified={setVerified} /> :
                        <ResetPassword email={email} />)
            }
        </div>
    )
}

export default ForgetPass