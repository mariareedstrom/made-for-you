import React from 'react'
import ListItem from "@mui/material/ListItem";
import {Box, IconButton, ListItemText, Typography} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function Recipient({recipient, onDeleteRecipient}){

    return(

        <ListItem alignItems="flex-start">
            <ListItemText
                primary={
                    <Box
                        display='flex'
                        alignItems='baseline'
                        gap='1em'
                    >
                        <Typography
                            component="span"
                            fontWeight={'600'}
                            color="text.secondary"
                        >
                            {recipient.name}
                        </Typography>


                    </Box>
                }
                secondary={
                    <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                    >
                        {recipient.notes}
                    </Typography>
                }
            />
                    <IconButton onClick={onDeleteRecipient(recipient.id)} sx={{alignItems: "flex-end"}}>
                        <DeleteOutlineIcon color="error" />
                    </IconButton>


        </ListItem>
    )

}

export default Recipient