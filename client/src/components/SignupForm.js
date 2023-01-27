import React, {useContext, useState} from 'react';
import {Button, Paper, TextField, Typography, Link, Box, Alert} from "@mui/material";
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {CurrentMemberContext} from "../context/currentMember";


function SignupForm() {
    const {setCurrentMember} = useContext(CurrentMemberContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        links:""
    })
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()


    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((user) => {
                        setCurrentMember(user)
                        navigate('/')
                    })
                } else {
                    resp.json().then((errorData) => {
                        setErrors(Object.values(errorData))
                    })
                }
            })
    }


    return (

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding:'40px'
        }}>
            <Paper elevation={10}
                   component="form"
                   onSubmit={handleSubmit}
                   sx={{
                       display: "flex",
                       flex:1,
                       flexDirection: "column",
                       gap: "24px",
                       padding: '20px',
                       maxWidth: '320px',
                   }}>
                <Box>
                    <Typography variant={"h6"}>Welcome New User</Typography>
                </Box>
                {errors.length > 0 && (
                    <ul >
                        {errors.map((error, i) => (
                            <li key={i}>
                                <Alert severity="error">{error}</Alert>
                            </li>
                        ))}
                    </ul>
                )}

                <TextField onChange={(e) => handleChange(e)}
                           label="Name"
                           name="name"
                           value={formData.name}
                           placeholder="enter name"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="email"
                           name="email"
                           value={formData.email}
                           placeholder="enter email"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="Password"
                           name="password"
                           value={formData.password}
                           placeholder="enter password"
                           type="password"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="about"
                           name="about"
                           value={formData.about}
                           placeholder="enter something about you"
                           type="text"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="links"
                           name="links"
                           value={formData.links}
                           placeholder="your social media links"
                           type="url"
                           fullWidth required/>
                <Button type="submit"
                        color="primary"
                        sx={{margin: "8px, 0"}}
                        fullWidth required
                        variant="contained">
                    Sign Up!
                </Button>
                <Typography>Already have an account? </Typography>
                <Link component={RouterLink} to="/" sx={{marginLeft: '1em'}}>Log In</Link>

            </Paper>
        </Box>


    );
}

export default SignupForm;