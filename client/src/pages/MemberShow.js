import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {CurrentMemberContext} from "../context/currentMember";
import {Box, Button, Grid, Paper, Stack, styled, Typography} from "@mui/material";
import GiftCard from "../components/GiftCard";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Recipient from "../components/Recipient";
import NewRecipientForm from "../components/NewRecipientForm";


function MemberShow({handleLogout, onGiftUpdate, gift}) {
    const {currentMember} = useContext(CurrentMemberContext)
    const {name, about, id, gifts} = currentMember
    const [recipients, setRecipients] = useState(currentMember.recipients)


    function handleAddRecipient(data) {
console.log(data)
    }

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

    return (

        <Box>
            < Box sx={{maxWidth: "550px", margin: "0 auto"}}>
                <Box sx={{
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
                        display: "flex"
                    }}>
                        <img alt='member'
                             style={{
                                 minHeight: " 100%",
                                 minWidth: "100%",
                                 objectFit: "cover"
                             }}
                             src="/gift.png"/>
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

                <Typography variant="h6" color="text.secondary">Gift Recipients</Typography>

                <List style={{padding: 0}}>
                    {recipients.map((recipient) => (
                        <Recipient key={recipient.id}
                                   recipient={recipient}
                                   component="li"
                                   onDeleteRecipient={handleDeleteRecipient}
                                   sx={{display: 'flex', flexDirection: 'row'}}/>
                    ))}
                </List>
                <NewRecipientForm recipients={recipients} setRecipients={setRecipients}/>

                <Grid container spacing={4}>
                    {gifts.map((gift) => (
                        <Grid item display="flex" key={gift.id}>
                            <GiftCard gift={gift}/>
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </Box>
    )
}

export default MemberShow;