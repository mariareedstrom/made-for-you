import React, {useContext} from "react";
import {Link, useNavigate}from 'react-router-dom'
import {CurrentMemberContext} from "../context/currentMember";
import {logo} from "./Header.module.css";
import {AppBar, Avatar, Button, Container, Toolbar} from "@mui/material";




function Header({handleLogout}) {
    const {currentMember} = useContext(CurrentMemberContext)
const navigate = useNavigate()

    function handleNewGift() {
        navigate(`/gifts/new`)
    }

    function handleViewMember() {
        navigate(`/members/${currentMember.id}`)
    }

    return (
        <AppBar position="static" sx={{marginBottom: "36px", bgcolor: "#fff"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to={`/`} style={{flex: 1}}>
                        <div className={logo}>
                            <img alt="logo" src="/logo.png"
                                 style={{objectPosition: '0 -30px', height: '120px'}}/>
                        </div>
                    </Link>


                    <Button variant="outlined"  sx={{margin: "12px"}}
                            onClick={handleNewGift}>New Gift</Button>


                    <Avatar variant="square" alt={`${currentMember.name}`} src={currentMember.picture} sx={{margin: "12px"}} onClick={handleViewMember}></Avatar>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


export default Header;