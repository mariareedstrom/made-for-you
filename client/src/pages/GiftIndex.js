import React, {useContext} from "react";
import GiftCard from "../components/GiftCard";
import {CurrentMemberContext} from "../context/currentMember";
import {Box, Grid} from "@mui/material";

function GiftIndex({gifts}){
    const currentMember = useContext(CurrentMemberContext)

    return(
        <Box display="flex">
            <Grid container spacing={4}>
                {gifts.map((gift) => (
                    <Grid item display="flex" key={gift.id}>
                        <GiftCard gift={gift}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default GiftIndex
