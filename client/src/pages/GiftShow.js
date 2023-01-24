import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";




function GiftShow({gifts}){
    const [gift, setGift] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const giftId = useParams().id

    useEffect(() => {
        if (gifts.length > 0) {
            const thisGift = gifts.find(({id}) => `${id}` === giftId)
            if (thisGift) {
                setGift(thisGift)
                setIsLoaded(true);
            }
        }
    }, [gifts, giftId]);


    console.log(gift)

    return(
        <div>gift show </div>
    )
}

export default GiftShow