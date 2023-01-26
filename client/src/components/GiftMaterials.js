import React, {useRef} from "react";
import {Box, Button, FormControl, TextField} from "@mui/material";
import List from "@mui/material/List";

function GiftMaterials({items, onItemsUpdated}) {
    const itemList = items.map((item, index) => {
        return (
            <FormControl component={"li"} key={`items[${index}]`} sx={{marginBottom: "16px"}}
                         onChange={(e) => handleChangeItem(e)}>
                <input type="hidden" name={`items[${index}].id`} value={item.id}/>
                <TextField
                    key={`${index}.quantity`}
                    label="Quantity"
                    name={`items[${index}].quantity`}
                    value={item.quantity}/>
                <TextField
                    key={`${index}.unit`}
                    label="Unit"
                    name={`items[${index}].unit`}
                    value={item.unit}/>
                <TextField
                    key={`${index}.name`}
                    label="Name"
                    name={`items[${index}].name`}
                    value={item.name}/>
            </FormControl>
        );
    });

    const itemListRef = useRef(null);

    function serializeItems() {
        const keyedValues = Array.from(itemListRef.current.querySelectorAll("[name]"))
            .reduce(
                (acc, node) => {
                    const [index, key] = node.name.split(".")
                    return {...acc, [index]: {...(acc[index] || {}), [key]: node.value}}
                },
                {}
            )
        return Object.values(keyedValues)
    }

    function handleChangeItem(e) {
        const materialValues = serializeItems()
        onItemsUpdated(materialValues)
    }

    function handleAddItem() {
        const materialValues = serializeItems();
        onItemsUpdated([...materialValues, {}]);
    }

    return (
        <Box>
            <List ref={itemListRef}>
                {itemList}
            </List>
            <Button
                variant="outlined"
                onClick={handleAddItem}
            >
                + Add Ingredient
            </Button>
        </Box>
    )

}

export default GiftMaterials;