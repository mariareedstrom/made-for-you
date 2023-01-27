import React from "react";
import GiftCard from "../components/GiftCard";
import {Box, Grid} from "@mui/material";

function GiftIndex({gifts}){

    return(
        <Box display="flex">
            <Grid container spacing={4} justifyContent="center">
                {gifts.map((gift) => (
                    <Grid item display="flex" key={gift.id} xs={8}>
                        <GiftCard gift={gift}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default GiftIndex
