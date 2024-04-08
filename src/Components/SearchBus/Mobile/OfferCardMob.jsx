import React from 'react'

const OfferCardMob = ({ image }) => {
    return (
        <div className='mx-auto   rounded-xl relative z-[-1]' >
            <img className='w-full rounded-xl relative z-[-1]' src={image} alt="" />
        </div>
    )
}

export default OfferCardMob