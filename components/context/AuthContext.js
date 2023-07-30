import { createContext, useState } from "react";

const AuthContext = createContext()

function AuthProvider({children}) {
    
    const [userToken, setUserToken] = useState(null)
    const [logOutModalVisiable, setLogOutModalVisiable] = useState(false)

    return(
        <AuthContext.Provider
            value = {{
                userToken,
                setUserToken,
                logOutModalVisiable,
                setLogOutModalVisiable
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}