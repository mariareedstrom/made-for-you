import React, {useState, useContext} from 'react';
import {Paper, TextField, Button, Typography, Link} from "@mui/material";
import {CurrentMemberContext} from "../context/currentMember";
import {Link as RouterLink} from 'react-router-dom'
import {Box, Alert} from "@mui/material";


function LoginForm() {
    const {currentMember, setCurrentMember} = useContext(CurrentMemberContext)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState([])

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((user) => {
                        setCurrentMember(user)
                    })
                } else
                    res.json().then((errorData) => {
                        setErrors(Object.values(errorData))
                    })
            })
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
                <Box>
                    <Typography variant={"h6"}>Sign In</Typography>
                    <Typography variant={"h6"}>{currentMember}</Typography>
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



                <Button type="submit"
                        color="primary"
                        fullWidth required
                        variant="contained"
                        sx={{margin: "8px, 0"}}
                >
                    Sign In
                </Button>
                <Typography>Don't have an account?</Typography>
                <Link component={RouterLink} to="/signup" sx={{marginLeft: '1em'}}>Sign Up</Link>
            </Paper>
        </Box>
    );
}

export default LoginForm;