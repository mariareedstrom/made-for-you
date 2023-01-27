import React, {useContext, useEffect, useState, useRef} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Box, Chip, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Typography} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import List from '@mui/material/List';
import Item from "../components/Item";
import {CurrentMemberContext} from "../context/currentMember";
import PersonAdd from "@mui/icons-material/PersonAdd";

function typeForValue(value) {
    if (value === 0) {
        return 'Craft'
    }
    if (value === 1) {
        return 'Food'
    }
    if (value === 2) {
        return 'Beverage'
    }
}

function Ungifted({gift, ungifted, onUngiftedAdded}) {
    const [selectedRecipient, setSelectedRecipient] = useState(null)

    function handleSelectedRecipient(e) {
        e.preventDefault()

        console.log(selectedRecipient)

        fetch(`/api/gift_recipients/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({recipient_id: selectedRecipient, gift_id: gift.id})
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(({recipient}) => {
                            onUngiftedAdded(recipient)
                            setSelectedRecipient(null)
                        })
                } else {
                    res.json().then((errorsData) => {
                        console.log(errorsData)
                    })
                }
            })
    }

    return <FormControl fullWidth>
        <InputLabel id="recipient-label">Who are you making this for?</InputLabel>
        <Select
            className="recipientDropdown"
            labelId="recipient-label"
            name="recipient_id"
            label="Who are you making this for?"
            value={selectedRecipient}
            onChange={(e) => setSelectedRecipient(e.target.value)}
        >
            {ungifted.map(r => <MenuItem value={r.id} key={r.id}>{r.name}</MenuItem>)}
        </Select>
        <IconButton onClick={handleSelectedRecipient}>
            <PersonAdd/>
        </IconButton>
    </FormControl>
}

function GiftShow({gifts, onDeleteGift}) {
    const {currentMember} = useContext(CurrentMemberContext)
    const [gift, setGift] = useState(null)
    const [giftRecipients, setGiftRecipients] = useState([])

    const giftId = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        if (gifts.length > 0) {
            const currentGift = gifts.find(({id}) => `${id}` === giftId)
            if (currentGift) {
                setGift(currentGift)
                setGiftRecipients(currentGift.recipients)
            }
        }
    }, [gifts, giftId]);


    if (!gift) {
        return <></>
    }

    const {type_of_gift, name, description, picture_url, difficulty, member, items, id, instructions} = gift

    const ungifted = currentMember.recipients.filter(({id}) => {
        return !giftRecipients.some((r) => r.id === id)
    })

    function handleDeleteGift() {
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
            <Box sx={{height: "460px", objectFit: "cover"}}>
                <img alt={name} src={picture_url} width="100%" height="100%"/>
            </Box>


            <Typography variant="h2">{name}</Typography>
            <Typography component="span">Made by {member.name}</Typography>
            <Box display={'flex'} gap={'12px'}>
                <Chip label={`Difficulty: ${difficulty}`}/>
                <Chip label={typeForValue(type_of_gift)}/>
                <Box display={'flex'} flex={'1 1 auto'} justifyContent={'flex-end'} gap={'12px'}>
                    {
                        currentMember.id === member.id ?
                            <IconButton color="error"
                                        component={Link}
                                        to={{pathname: `/gifts/${id}/edit`}}
                                        alignself={'flex-end'}
                            >
                                <EditOutlinedIcon/>
                            </IconButton> : null
                    }
                    {
                        currentMember.id === member.id ?
                            <IconButton color="error"
                                        onClick={handleDeleteGift}
                            >
                                <DeleteOutlineIcon/>
                            </IconButton> : null
                    }
                </Box>
            </Box>


            {ungifted.length > 0 ?
                <Ungifted
                    gift={gift}
                    ungifted={ungifted}
                    onUngiftedAdded={(recipient) => setGiftRecipients([...giftRecipients, recipient])}>
                </Ungifted> : <Box>You've made this for everyone!</Box>}

            <Typography>
                {description}
            </Typography>

            <Box sx={{display: "flex", columnGap: "16px"}}>

                <Paper sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
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
                <Paper sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                    <Typography variant="subtitle1" color="text.secondary">Instructions</Typography>
                    <Typography>{instructions}</Typography>
                </Paper>
            </Box>

            <Box>
                <Typography>
                    This gift has previously been made with ❤️ for {
                       giftRecipients.map((recipient) => recipient.name).join(', ')
                    }
                </Typography>
            </Box>
        </Paper>
    )
}

export default GiftShow;
