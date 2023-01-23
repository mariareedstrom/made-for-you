import React, {createContext} from "react";


const CurrentMemberContext = createContext(null)


function CurrentMemberProvider({currentMember, children}) {


    return (
        <CurrentMemberContext.Provider value={currentMember}>
            {children}
        </CurrentMemberContext.Provider>
    )
}

export {CurrentMemberContext, CurrentMemberProvider}
