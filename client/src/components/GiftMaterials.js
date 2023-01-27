import React, {useRef} from "react";
import {Box, Button, FormControl, TextField} from "@mui/material";
import List from "@mui/material/List";

function GiftMaterials({items, onItemsUpdated}) {
    // split items by group on _destroy => [_destroy:true, rest]
    // map over rest

    const itemList = items.map((item, index) => {
        return (
            <FormControl component={"li"} key={`items[${index}]`} sx={{display: "flex", flexWrap:"nowrap", flexDirection:"row", gap:"12px", marginBottom: "16px"}}
                         onChange={(e) => handleChangeItem(e)}>
                <input type="hidden" name={`items[${index}].id`} value={item.id}/>
                <Box sx={{display:"flex", flex:"0 1 30%"}}>
                    <TextField
                        sx={{'& fieldset': {borderTopRightRadius:"0", borderBottomRightRadius:"0"}}}
                        key={`${index}.quantity`}
                        label="Quantity"
                        name={`items[${index}].quantity`}
                        value={item.quantity}/>
                    <TextField
                        sx={{'& fieldset': {borderTopLeftRadius:"0", borderBottomLeftRadius:"0"}}}
                        key={`${index}.unit`}
                        label="Unit"
                        name={`items[${index}].unit`}
                        value={item.unit}/>
                </Box>
                <TextField
                    sx={{display:"flex", flex:"1 1 80%"}}
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
        onItemsUpdated(materialValues)// <- concat with _destroy set
    }

    function handleAddItem() {
        onItemsUpdated([...items, {id: "", quantity: "", unit: "", name: ""}]);
    }

    // function handleDeleteItem(id) {
    //     add `_destroy: true` to object
    //     call items updated
    // }

    return (
        <Box>
            <List ref={itemListRef}>
                {itemList}
            </List>
            <Button
                variant="outlined"
                onClick={handleAddItem}
            >
                + Add Item
            </Button>
        </Box>
    )

}

export default GiftMaterials;