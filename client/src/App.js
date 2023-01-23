import React, {useEffect, useState, useMemo} from "react";
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {CurrentMemberContext} from "./context/currentMember";
import {Container} from "@mui/material";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Header from "./components/Header";
import GiftIndex from "./pages/GiftIndex";



function App() {

    const [currentMember, setCurrentMember] = useState(null)
    const value = useMemo(() => ({currentMember, setCurrentMember}), [currentMember, setCurrentMember]);

    const [authenticated, setAuthenticated] = useState(false)

    const navigate = useNavigate()

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
        <>
            <Container>
                <CurrentMemberContext.Provider value={value}>
                    {currentMember ? <Header handleLogout={handleLogout} /> : null}
                    <Routes>
                        <Route path="/" element=
                            {currentMember ? (
                                <GiftIndex/>
                            ) : (
                                <LoginForm/>
                            )}
                        />
                        <Route path="/signup" element={<SignupForm/>}/>
                    </Routes>
                </CurrentMemberContext.Provider>


            </Container>
        </>
    );
}

export default App;
