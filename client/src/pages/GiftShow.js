import React, {useContext, useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {Box, IconButton, Typography} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import List from '@mui/material/List';
import Item from "../components/Item";
import {CurrentMemberContext} from "../context/currentMember";



function GiftShow({gifts, onDeleteGift}) {
    const currentMember = useContext(CurrentMemberContext)
    const [gift, setGift] = useState(null)
    const giftId = useParams().id
    const navigate = useNavigate()


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

    const {type_of_gift, name, description, picture_url, difficulty, member, items, recipients, id} = gift

    function handleDeleteGift(){
        fetch(`/api/gifts/${giftId}`, {
            method: "DELETE",
        })
            .then(() => {
                onDeleteGift(giftId)
                navigate("/")
            })
    }

    return (
        <Box>
            <Box sx={{height: "460px"}}>
                <img alt={name} src={picture_url} width="100%" height="100%"/>
            </Box>

            <Box>
                <Typography variant="h2">{name}</Typography>
               <Typography> Difficulty: {difficulty} Type: {type_of_gift}</Typography>
            </Box>

            <Box sx={{width: "786px"}}>
                {description}
            </Box>

            <Box>
                <Typography component="span">
                     Made by {member.name}
                </Typography>
                <Typography>Made for:</Typography>
                <Typography component="span" >
                 {recipients.map((recipient) => (
                <Typography key={recipient.name}>{recipient.name}</Typography>
            ))}
                </Typography>
            </Box>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
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
            <Box>
                <Typography>Directions</Typography>
                <Typography>this is how we do it.. </Typography>
            </Box>
            {
                currentMember.currentMember.id === member.id ?
                    <IconButton color="error"
                                component={Link}
                                to={{pathname: `/gifts/${id}/edit`}}
                    >
                        <EditOutlinedIcon/>
                    </IconButton> : null
            }
            {
                currentMember.currentMember.id === member.id ?
                    <IconButton color="error"
                                onClick={handleDeleteGift}
                    >
                        <DeleteOutlineIcon/>
                    </IconButton> : null
            }

        </Box>
    )}

            export default GiftShow;