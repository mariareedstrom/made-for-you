import React from 'react'
import ListItem from "@mui/material/ListItem";
import {Box, ListItemText, Typography} from "@mui/material";

function Item({item}){

const {name, quantity, unit} = item
    return(
        <ListItem alignItems="flex-start">
            <ListItemText
                primary={
                    <Box
                        display='flex'
                        alignItems='baseline'
                        gap="6px"
                    >
                        <Typography

                            component="span"
                            variant="body2"
                            color="text.secondary"
                        >
                            {quantity} {unit}
                        </Typography>
                        <Typography
                            component="span"
                            fontWeight={'600'}
                            color="text.secondary"
                        >
                            {name}
                        </Typography>
                    </Box>
                }
      />
        </ListItem>

    )

}

export default Item;