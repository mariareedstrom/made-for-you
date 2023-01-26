import React, {useContext, useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import { Box, Chip, IconButton, Paper, Typography} from "@mui/material";
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

    const {type_of_gift, name, description, picture_url, difficulty, member, items, recipients, id, instructions} = gift

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
        <Paper>
            <Box sx={{height: "460px", objectFit:"cover"}} >
                <img alt={name} src={picture_url} width="100%" height="100%" />
            </Box>


            <Typography variant="h2">{name}</Typography>
            <Typography component="span">Made by {member.name}</Typography>
            <Box display={'flex'} gap={'12px'}>
                <Chip label={difficulty}/>
                <Chip label={type_of_gift} />
                <Box display={'flex'} flex={'1 1 auto'} justifyContent={'flex-end'} gap={'12px'}>
                    {
                        currentMember.currentMember.id === member.id ?
                            <IconButton color="error"
                                        component={Link}
                                        to={{pathname: `/gifts/${id}/edit`}}
                                        alignself={'flex-end'}
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
            </Box>

            <Typography >
                {description}
            </Typography>

            <Box sx={{display:"flex", columnGap:"16px"}}>

            <Paper sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <Typography variant="subtitle1" color="text.secondary">Items required</Typography>
                <List>
                    {items.map((item) =>
                        (<Item key={item.id}
                               item={item}
                               component="li"
                               sx={{display: 'flex', flexDirection: 'row'}}
                        />
                        ))}
                </List>
            </Paper>
            <Paper sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <Typography variant="subtitle1" color="text.secondary">Instructions</Typography>
                <Typography>{instructions}</Typography>
            </Paper>
            </Box>

            <Box>
                <Typography>This gift has been made with love for</Typography>
                <Typography component="span" >
                    {recipients.map((recipient) => (
                        <Typography key={recipient.name}>{recipient.name}</Typography>
                    ))}
                </Typography>
            </Box>


        </Paper>
    )}

            export default GiftShow;