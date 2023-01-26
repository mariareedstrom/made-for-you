import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from "@mui/material/Typography";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField} from "@mui/material";
import GiftMaterials from "../components/GiftMaterials";

const GIFT_TYPE = {
    CRAFT: 0,
    FOOD: 1,
    BEVERAGE: 2
};
function GiftEdit({gifts, onGiftUpdate}) {
    const [gift, setGift] =  useState(null)
    const [errors, setErrors] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        picture_url: "",
        type_of_gift: GIFT_TYPE.FOOD,
        difficulty: 0,
        description: "",
        items: [{id: "", quantity: 0, unit: "", name: ""}],
        instructions:""
    })

    const giftId = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        if (gifts.length > 0) {
            const currentGift = gifts.find(({id}) => `${id}` === giftId)
            if (currentGift) {
                setGift(currentGift)
            }
        }
    }, [gifts, giftId]);

    useEffect(() => {
        if (gift) {
            setFormData({
                name: gift.name,
                picture_url: gift.picture_url,
                type_of_gift: gift.type_of_gift,
                difficulty: gift.difficulty,
                description: gift.description,
                items: gift.items,
                instructions: gift.instructions
            })
        }
    }, [gift]);

    console.log(gift)
    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function onItemsUpdated(items) {
        setFormData({...formData, items})
    }

    function handleSubmit(e){
        e.preventDefault()

        fetch(`/api/gifts/${gift.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then((data) => {
                            setGift(data)
                            onGiftUpdate(gift, formData)
                            navigate(`/gifts/${gift.id}`)
                        })
                } else {
                    res.json().then((errorsData) => setErrors(errorsData))
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
                       display: 'flex',
                       flex: 1,
                       flexDirection: 'column',
                       gap: '24px',
                       maxWidth: '650px',
                       padding: '20px'
                   }}
            >
                <Box>
                    <EditOutlinedIcon/>
                    <Typography variant={"h6"}>Edit Your Gift</Typography>
                </Box>

                <TextField onChange={(e) => handleChange(e)}
                           label="name"
                           name="name"
                           value={formData.name}
                           placeholder="enter name"
                           type="text"
                           fullWidth required/>
                <TextField onChange={(e) => handleChange(e)}
                           label="picture"
                           name="picture_url"
                           value={formData.picture_url}
                           placeholder="enter picture url"
                           type="text"
                           fullWidth required/>
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

                {!!errors && errors.length > 0 && (
                    <ul style={{ color: "red" }}>
                        {errors.map((error, i) => (
                            <li key={i}>{error}</li>
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
    );
}

export default GiftEdit;