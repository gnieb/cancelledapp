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

// Notes About Async Storage:(https://blog.logrocket.com/guide-react-natives-asyncstorage/)
// * asynchronous, unencrypted, persistent, key-value storage system for React Native
// * allows users to persist data offline in React Native
// * accepts and stores only string data (must serialize data before storing if not a string)
// * use JSON.stringify() if object is a string
// * use JSON.parse() to convert back to object