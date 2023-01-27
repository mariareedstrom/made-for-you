import React, {useContext, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {CurrentMemberContext} from "../context/currentMember";
import List from "@mui/material/List";
import GiftCard from "../components/GiftCard";
import Recipient from "../components/Recipient";
import NewRecipientForm from "../components/NewRecipientForm";
import {Box, Button, Collapse, IconButton, styled, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";

import AddIcon from '@mui/icons-material/Add';

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function MemberShow({handleLogout}) {
    const {currentMember} = useContext(CurrentMemberContext)
    const [recipients, setRecipients] = useState([])
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setRecipients(currentMember.recipients)
    }, [currentMember])

    const {name, about, id, gifts, picture} = currentMember

    function handleDeleteRecipient(recipient_id) {
        return (_event) => {
            fetch(`/api/recipients/${recipient_id}`, {
                method: "DELETE"
            })
                .then((resp) => {
                    if (resp.status === 204) {
                        const filtered = recipients.filter(({id}) => id !== recipient_id)
                        setRecipients(filtered)
                    }
                })
        }
    }

    function handleNewGift() {
        navigate(`/gifts/new`)
    }


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (

        <Box>
            <Box sx={{
                maxWidth: "550px",
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",

            }}>
                <Box sx={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    display: "flex",
                }}>
                    <img alt='member'
                         style={{
                             minHeight: " 100%",
                             minWidth: "100%",
                             objectFit: "cover"
                         }}
                         src={picture}/>
                </Box>
                <Box>
                    <Typography variant="h4" gutterBottom sx={{marginTop: '16px'}}>
                        {name}
                    </Typography>
                    <Typography>
                        {about}
                    </Typography>
                    {currentMember ?
                        <Button component={Link} to={{pathname: `/members/${id}/edit`}}> Edit
                            Profile</Button> : null}
                    <Button sx={{margin: "12px"}}
                            onClick={handleLogout}>Logout</Button>
                </Box>
            </Box>

            <Box display={'flex'} gap={1} marginTop={"24px"}>
                <Box>
                    <Typography variant="h6" color="text.secondary">Gift Recipients</Typography>
                    <List style={{padding: 0}}>
                        {recipients.map((recipient) => (

                                <Recipient key={recipient.id}
                                           recipient={recipient}
                                           onDeleteRecipient={handleDeleteRecipient}
                                           sx={{display: 'flex', flexDirection: 'row'}}/>


                        ))}
                    </List>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        sx={{display:"flex", justifyContent:"flex-end"}}
                    >
                            <AddIcon/>
                    </ExpandMore>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <NewRecipientForm recipients={recipients} setRecipients={setRecipients}/>
                    </Collapse>
                </Box>
                <Box>
                    <Typography variant="h6" color="text.secondary">Gift Options</Typography>
                    <List>

                        {gifts.map((gift) => (
                            <ListItem key={gift.id}>
                                <GiftCard gift={gift}/>
                            </ListItem>

                        ))}
                    </List>
                    <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                        <Button variant="outlined"  sx={{margin: "12px"}}
                            onClick={handleNewGift}>New Gift</Button>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default MemberShow;