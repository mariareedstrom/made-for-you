import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";

function NewRecipientForm({recipients, setRecipients}){
    const [formData, setFormData] = useState({
        name: "",
        notes: "",
    })
    const [errors, setErrors] = useState([])

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()

        return fetch(`/api/recipients/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => {
                            setRecipients([...recipients, data])
                            setFormData({...formData, name: "", notes:""})
                            setErrors([])
                        })
                } else {
                    res.json().then((errorsData) => {
                        setErrors(errorsData)
                    })
                }
            })
    }

    return (

        <Box onSubmit={handleSubmit}>
            <TextField onChange={(e) => handleChange(e)}
                       label="name"
                       name="name"
                       value={formData.name}
                       placeholder="add recipient"
                       fullWidth required
                       size={'small'}
                       variant={'standard'}
                       sx={{marginBottom: '12px'}}/>
            <TextField onChange={(e) => handleChange(e)}
                       label="notes"
                       name="notes"
                       value={formData.notes}
                       placeholder="notes"
                       variant={'standard'}
                       size={'small'}
                       fullWidth required
                       multiline
                       sx={{marginBottom: '12px'}}/>

            {errors.length > 0 && (
                <ul style={{color: "red"}}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}

            <Button type="submit"
                    onClick={handleSubmit}
                    color="primary"

                    fullWidth required
                    variant="outlined">
                Submit
            </Button>
        </Box>
    );
}

export default NewRecipientForm;
