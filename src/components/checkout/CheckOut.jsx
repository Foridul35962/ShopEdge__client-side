import React from 'react'

const CheckOut = () => {
    const cart = {
        product: [
            {
                name: "Stylish Jacket",
                size: "M",
                color: "Black",
                price: 120,
                image: "https://picsum.photos/150?random=1"
            },
            {
                name: "Jacket",
                size: "L",
                color: "Black",
                price: 100,
                image: "https://picsum.photos/150?random=2"
            },
        ],
        totalPrice: 195
    }
  return (
    <div className='container mx-auto px-5 sm:px-0'>
        <div>
            <h1>Check OUt</h1>
            <div>
                <div>
                    <h1>Contract Details</h1>
                    <form>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" />
                        </div>
                        <h1>Delivery</h1>
                        <div>
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" id="firstName" />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="lastName" id="lastName" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input type="time" name="address" id="address" />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" id="city" />
                            </div>
                            <div>
                                <label htmlFor="postCode">Postal Code</label>
                                <input type="number" name="postCode" id="postCode" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Country">Country</label>
                            <input type="text" name='country' id='country' />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input type="number" name="phone" id="nnumber" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckOut