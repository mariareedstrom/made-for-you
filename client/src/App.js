import React, {useEffect, useState, useMemo} from "react";
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {CurrentMemberContext} from "./context/currentMember";
import {Container} from "@mui/material";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import GiftIndex from "./pages/GiftIndex";
import GiftShow from "./pages/GiftShow";
import NewGiftForm from "./components/NewGiftForm";
import MemberShow from "./pages/MemberShow";
import MemberEdit from "./pages/MemberEdit";



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

    function handleLogout(){
        setCurrentMember(null)
        fetch('/api/logout', {method: "DELETE"})
        navigate(`/`)
    }

    return (
                <CurrentMemberContext.Provider value={value}>
                    {currentMember ? <Header /> : null}
                    <Container>
                        <Routes>
                            <Route path="/" element=
                                {currentMember ? (
                                    <GiftIndex gifts={gifts}/>
                                ) : (
                                    <LoginForm/>
                                )}
                            />
                            <Route path="/signup" element={<SignupForm/>}/>
                            <Route path="/members/:id" element={<MemberShow handleLogout={handleLogout}/>}/>
                            <Route path="/members/:id/edit" element={<MemberEdit />}/>
                            <Route path="/gifts/:id" element={<GiftShow gifts={gifts}/>}/>
                            <Route path="/gifts/new" element={<NewGiftForm />}/>
                        </Routes>
                    </Container>

                </CurrentMemberContext.Provider>
    );
}

export default App;
