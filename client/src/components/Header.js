import React, {useContext} from "react";
import {Link}from 'react-router-dom'
import {CurrentMemberContext} from "../context/currentMember";
import {logo} from "./Header.module.css";
import {AppBar, Avatar, Button, Container, Toolbar} from "@mui/material";




function Header({handleLogout}) {
    const {currentMember} = useContext(CurrentMemberContext)

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
                    <Button size="small">Craft</Button>
                    <Button size="small">Food</Button>
                    <Button size="small">Beverage</Button>

                    <Button variant="outlined" color="primary" sx={{margin: "12px"}}
                            onClick={handleLogout}>Logout</Button>

                    <Avatar variant="square" alt={`${currentMember.name}`} src="/gift.png" sx={{margin: "12px"}}></Avatar>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


export default Header;