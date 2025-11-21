import React, { useState } from 'react'
import VerifyOtp from '../components/layout/VerifyOtp'
import RegistrationDesign from './RegistrationDesign'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [verify, setVerify] = useState(false)
    return (
        <div>
            {verify 
                ? <VerifyOtp email={email} /> 
                : <RegistrationDesign setVerify={setVerify} setEmail={setEmail} />
            }
        </div>
    )
}

export default Registration