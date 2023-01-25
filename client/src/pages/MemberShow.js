import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {CurrentMemberContext} from "../context/currentMember";
import {Box, Button, Grid, Paper, Stack, styled, Typography} from "@mui/material";
import GiftCard from "../components/GiftCard";
import MemberEdit from "./MemberEdit";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function MemberShow({handleLogout}) {
    const {currentMember} = useContext(CurrentMemberContext)
    const {name, about, id, gifts, recipients} = currentMember

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
                        <Button   sx={{margin: "12px"}}
                                onClick={handleLogout}>Logout</Button>
                    </Box>
                </Box >
                <Stack spacing={1}>
                    <Typography>My Gift Recipients: </Typography>
                    {recipients.map((recipient) =>(
                        <Item>{recipient.name}</Item>
                        )
                    )}
                </Stack>
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