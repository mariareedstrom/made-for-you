import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import List from '@mui/material/List';
import Item from "../components/Item";


function GiftShow({gifts}) {
    const [gift, setGift] = useState(null)

    const giftId = useParams().id

    useEffect(() => {
        if (gifts.length > 0) {
            const currentGift = gifts.find(({id}) => `${id}` === giftId)
            if (currentGift) {
                setGift(currentGift)
            }
        }
    }, [gifts, giftId]);

    if (!gift) {
        return <></>
    }

    const {type_of_gift, name, description, picture_url, difficulty, member, items} = gift

    return (
        <Box>
            <Box sx={{width: "768px", height: "460px"}}>
                <img alt={name} src={picture_url} width="100%" height="100%"/>
            </Box>
            <Box>
                <Typography variant="h2">
                    {name}
                </Typography>
            </Box>
            <Box>
                Difficulty: {difficulty} Type: {type_of_gift}
            </Box>
            <Box sx={{width: "786px"}}>
                {description}
            </Box>
            <Box>
                Made by {member.name}
            </Box>

            <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <Typography color="text.secondary">Items Needed:</Typography>
                <List>
                    {items.map((item) =>
                        (<Item key={item.id}
                               item={item}
                               component="li"
                               sx={{display: 'flex', flexDirection: 'row'}}
                        />
                        ))}
                </List>
            </Box>
        </Box>
    )}

            export default GiftShow;