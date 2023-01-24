import React, {useContext} from "react";
import {CurrentMemberContext} from "../context/currentMember";
import {logo} from "./Header.module.css";
import {AppBar, Avatar, Box, Button, Container, Link, Toolbar} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';




function Header({handleLogout}) {
    const {currentMember} = useContext(CurrentMemberContext)
    // const [category, setCategory] = React.useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setCategory(event.target.value);
    // };

    return (
        <AppBar position="static" sx={{marginBottom: "36px", bgcolor: "#fff"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to={`/`} style={{flex: 1}}>
                        <div className={logo}>
                            <img alt="logo" src="/logo.png"
                                 style={{objectPosition: '0 -30px', height: '120px'}}/>
                        </div>
                    </Link>
                    <Button size="small">Craft</Button>
                    <Button size="small">Food</Button>
                    <Button size="small">Beverage</Button>

                    {/*<Box sx={{ minWidth: 120 }}>*/}
                    {/*    <FormControl fullWidth>*/}
                    {/*        <InputLabel id="demo-simple-select-label">Category</InputLabel>*/}
                    {/*        <Select*/}
                    {/*            labelId="category-select-label"*/}
                    {/*            id="category-select"*/}
                    {/*            value={category}*/}
                    {/*            label="Category"*/}
                    {/*            onChange={handleChange}*/}
                    {/*        >*/}
                    {/*            <MenuItem value={"christmas"}>Christmas</MenuItem>*/}
                    {/*            <MenuItem value={"Valentines"}>Valentines</MenuItem>*/}
                    {/*            <MenuItem value={"Birthday"}>Birthday</MenuItem>*/}
                    {/*        </Select>*/}
                    {/*    </FormControl>*/}
                    {/*</Box>*/}
                    <Button variant="outlined" color="primary" sx={{margin: "12px"}}
                            onClick={handleLogout}>Logout</Button>

                    <Avatar variant="square" alt={`${currentMember.name}`} src="/gift.png" sx={{margin: "12px"}}></Avatar>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


export default Header;