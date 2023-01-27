import React, {useEffect, useState, useMemo} from "react";
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {CurrentMemberContext} from "./context/currentMember";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import GiftIndex from "./pages/GiftIndex";
import GiftShow from "./pages/GiftShow";
import NewGiftForm from "./components/NewGiftForm";
import MemberShow from "./pages/MemberShow";
import MemberEdit from "./pages/MemberEdit";
import GiftEdit from "./pages/GiftEdit";
import {Container} from "@mui/material";



function App() {

    const [currentMember, setCurrentMember] = useState(null)
    const value = useMemo(() => ({currentMember, setCurrentMember}), [currentMember, setCurrentMember]);

    const [authenticated, setAuthenticated] = useState(false)
    const [gifts, setGifts] = useState([])


    const navigate = useNavigate()

    useEffect(()=> {
        fetch('/api/gifts')
            .then((res) => res.json())
            .then((gifts) => setGifts(gifts))
    }, [])


    useEffect(() => {
        fetch('/api/me')
            .then((res) => {
                if (res.ok) {
                    res.json().then((member) => {
                        setCurrentMember(member)
                        setAuthenticated(true)
                    })
                } else {
                    setAuthenticated(true)
                }
            })
    }, [])

    if (!authenticated) {
        return <div></div>
    }

    function handleAddGift(giftObj) {
        setGifts([...gifts, giftObj])
    }
    function handleLogout(){
        setCurrentMember(null)
        fetch('/api/logout', {method: "DELETE"})
        navigate(`/`)
    }

    function handleDeleteGift(giftId){
            setGifts(gifts.filter(({id}) => `${id}` !== giftId))
    }

    function handleGiftUpdate(gift, props) {
        const index = gifts.indexOf(gift)
        const updated = {...gift, ...props}
        const copyArray = gifts.slice()

        copyArray.splice(index, 1, updated)
        setGifts(copyArray)
    }

    return (

                <CurrentMemberContext.Provider value={value}>
                    {currentMember ? <Header /> : null}
                    <Container maxWidth="md"  sx={{marginBottom: '24px'}} >
                        <Routes>
                            <Route path="/" element=
                                {currentMember ? (
                                    <GiftIndex gifts={gifts}/>
                                ) : (
                                    <LoginForm/>
                                )}
                            />
                            <Route path="/signup" element={<SignupForm/>}/>
                            <Route path="/members/:id" element={<MemberShow handleLogout={handleLogout}
                                                                            onGiftUpdate={handleGiftUpdate}
                                                                            gifts={gifts}/>}/>
                            <Route path="/members/:id/edit" element={<MemberEdit />}/>
                            <Route path="/gifts/:id" element={<GiftShow gifts={gifts}
                                                                        onDeleteGift={handleDeleteGift}/>}/>
                            <Route path="/gifts/:id/edit" element={<GiftEdit gifts={gifts}
                                                                             onGiftUpdate={handleGiftUpdate}
                                                                             onDeleteGift={handleDeleteGift}/>}/>
                            <Route path="/gifts/new" element={<NewGiftForm onAddGift={handleAddGift}/>}/>
                        </Routes>
                    </Container>

                </CurrentMemberContext.Provider>
    );
}

export default App;
