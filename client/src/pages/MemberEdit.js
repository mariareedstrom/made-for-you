import React, {useContext} from 'react';
import { useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Box, Button, Paper, TextField} from "@mui/material";
import {CurrentMemberContext} from "../context/currentMember";


function MemberEdit() {
    const {currentMember, setCurrentMember}= useContext(CurrentMemberContext)
    const navigate = useNavigate()

    function handleChange(e) {
        setCurrentMember({...currentMember, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        return fetch(`/api/users/${currentMember.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentMember)
        })
            .then(res => res.json())
            .then(data => {
                setCurrentMember(data)
                navigate(`/users/${currentMember.id}`)
            })
    }

    function handleFromCancel() {
        navigate(`/members/${currentMember.id}`)
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '40px'
        }}>

            <Paper elevation={10}
                   component="form"
                   onSubmit={handleSubmit}
                   sx={{
                       display: 'flex',
                       flex: 1,
                       flexDirection: 'column',
                       gap: '24px',
                       padding: '20px',
                       maxWidth: '320px'
                   }}>

                <Typography variant={"h6"}>Update your profile</Typography>

                <TextField onChange={(e) => handleChange(e)}
                           label="Name"
                           name="name"
                           value={currentMember.name}
                           placeholder="enter name"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="email"
                           name="email"
                           value={currentMember.email}
                           placeholder="enter email"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="about"
                           name="about"
                           value={currentMember.about}
                           placeholder="enter something about you"
                           type="text"
                           fullWidth required/>
                {/*<TextField onChange={(e) => handleChange(e)}*/}
                {/*           label="picture"*/}
                {/*           name="picture"*/}
                {/*           value={currentMember.picture}*/}
                {/*           placeholder="picture url"*/}
                {/*           type="url"*/}
                {/*           fullWidth required/>*/}
                <Button type="submit"
                        onClick={handleSubmit}
                        sx={{margin: "8px, 0"}}
                        variant="contained"
                        fullWidth required>
                    Submit
                </Button>
                <Button
                    onClick={handleFromCancel}
                    sx={{margin: "8px, 0"}}
                    variant="outlined"
                    fullWidth required>
                    Cancel
                </Button>
            </Paper>
        </Box>
    );
}

export default MemberEdit;