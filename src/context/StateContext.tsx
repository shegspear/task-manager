import React, {useState, createContext} from 'react'

export const StateContext = createContext<any>(null)

export const StateProvider = ({children}:any) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>('')
    return (
        <StateContext.Provider 
            value={[loggedIn, setLoggedIn, userName, setUserName]}
        >
            {children}
        </StateContext.Provider>
    )
}