import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import GiftMaterials from "./GiftMaterials";

const GIFT_TYPE = {
    CRAFT: 0,
    FOOD: 1,
    BEVERAGE: 2
};

function NewGiftForm({onAddGift}){
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        type_of_gift: GIFT_TYPE.FOOD,
        difficulty: 0,
        description: "",
        items: [{id: "", quantity: 0, unit: "", name: ""}],
        instructions:""
    })
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function onItemsUpdated(items) {
        setFormData({...formData, items})
    }


    function handleSubmit(e) {
        e.preventDefault()

        const items_attributes = formData.items.filter(
            (item) => item !== {id: "", quantity: "0", unit: "", name: ""}
        );

        fetch(`/api/gifts/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData, items_attributes})
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            onAddGift(data)
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
                <FormControl>
                    <InputLabel id="type_of_gift-label">Type</InputLabel>
                    <Select
                        labelId="type_of_gift-label"
                        label="Type"
                        name="type_of_gift"
                        value={formData.type_of_gift}
                        onChange={handleChange}
                    >
                        <MenuItem value={GIFT_TYPE.FOOD}>food</MenuItem>
                        <MenuItem value={GIFT_TYPE.CRAFT}>craft</MenuItem>
                        <MenuItem value={GIFT_TYPE.BEVERAGE}>beverage</MenuItem>

                    </Select>
                </FormControl>

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
                <Typography variant={"h7"}>Necessary Items:</Typography>
                <GiftMaterials
                    items={formData.items}
                    onItemsUpdated={onItemsUpdated}
                />
                <TextField onChange={(e) => handleChange(e)}
                           label="instructions"
                           name="instructions"
                           value={formData.instructions}
                           placeholder="enter brief instructions"
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