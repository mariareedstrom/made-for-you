import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";

function NewGiftForm(){
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        type_of_gift: 0,
        difficulty: 0,
        description: "",
    })

    const [errors, setErrors] = useState([])
    const [type, setType] = useState()
    const navigate = useNavigate()

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()


        fetch(`/api/gifts/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            console.log(data)
                            navigate("/")
                        })
                } else
                    res.json().then((errorsData) => {
                        setErrors(errorsData)
                    })
            })
    }


    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding:'40px'
        }}>
            <Paper elevation={5}
                   component="form"
                   onSubmit={handleSubmit}
                   sx={{
                       display: 'flex',
                       flex: 1,
                       flexDirection: 'column',
                       gap: '24px',
                       maxWidth: '650px',
                       padding: '20px'

                   }}
            >
                <Box>
                    <Typography variant={"h6"}>Create a New Gift</Typography>
                </Box>
                <Select
                    labelId="type selector"
                    id="type"
                    value={type}
                    label="Type"
                    placeholder="type"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>food</MenuItem>
                    <MenuItem value={1}>craft</MenuItem>
                    <MenuItem value={2}>beverage</MenuItem>

                </Select>

                <TextField onChange={(e) => handleChange(e)}
                           label="name"
                           name="name"
                           value={formData.name}
                           placeholder="enter name"
                           type="text"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="image"
                           name="picture_url"
                           value={formData.picture_url}
                           placeholder="enter picture url"
                           type="text"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="difficulty"
                           name="difficulty"
                           value={formData.difficulty}
                           placeholder="enter difficulty level"
                           type="number"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="description"
                           name="description"
                           value={formData.description}
                           placeholder="enter gift description"
                           type="text"
                           fullWidth required/>
                {errors.length > 0 && (
                    <ul style={{ color: "red" }}>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <Box sx={{'& > :not(style)': {m: 1}}}>
                    <Button variant="contained" size="medium" color="primary" aria-label="submit" type="submit">
                        Submit
                    </Button>
                    <Button variant="outlined" size="medium" color="error" aria-label="add" component={Link} to="/">
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default NewGiftForm;