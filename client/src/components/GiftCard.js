import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import { Link } from 'react-router-dom';

function typeForValue(value) {
    if (value === 0) { return 'Craft'}
    if (value === 1) { return 'Food'}
    if (value === 2) { return 'Beverage'}
}

function GiftCard({gift}) {
    const {type_of_gift, name, description,  picture_url, difficulty, id} = gift



    return (
        <Card sx={{ display: 'flex', maxWidth:"345"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <CardActions>
                        <Button size="small">{typeForValue(type_of_gift)}</Button>
                        <Button size="small">Difficulty: {difficulty}</Button>
                    </CardActions>
                    <CardActions>
                        <Button variant="contained"
                                component={Link}
                                to={{pathname: `/gifts/${id}`}}
                               >
                            Make this!
                        </Button>
                    </CardActions>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={picture_url}
                alt="a gift"
            />
        </Card>
    );
};

export default GiftCard;