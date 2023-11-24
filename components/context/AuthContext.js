import { createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext()

function AuthProvider({children}) {
    
    const [userToken, setUserToken] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

    const login = (username, password) => {
        setIsLoading(true)
        const currentUser = {
            username: username,
            _password_hash: password
        }
        fetch('http://127.0.0.1:5555/login', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(currentUser)
            }
        )
            .then(r => {
                if (r.status === 200) {
                    r.json().then((data) => {
                        setUserInfo(data.user)
                        setUserToken(data.token)

                        AsyncStorage.setItem('userToken', JSON.stringify(data.token))
                        AsyncStorage.setItem('userInfo', JSON.stringify(data.user))
                    })
                } else {
                    loginValidation('Unable to Login')
                }
            })
        setIsLoading(false)
    }

    const signUp = (newUsername, newPassword) => {
        setIsLoading(true)
        const newUser = {
            username: newUsername,
            _password_hash: newPassword
        }
        fetch('http://127.0.0.1:5555/users', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newUser)
            }
        )
            .then(r => {
                if (r.status === 200) {
                    r.json().then((data) => {
                        setUserInfo(data.user)
                        setUserToken(data.token)

                        AsyncStorage.setItem('userToken', JSON.stringify(data.token))
                        AsyncStorage.setItem('userInfo', JSON.stringify(data.user))
                    })
                } else {
                    loginValidation('invalid Username')
                }
            })

        setIsLoading(false)
    }

    useEffect(()=>{
        isLoggedIn()
    }, [])


    return(
        <AuthContext.Provider value = {{
                userToken,
                userInfo,
                isLoading,
                signUp,
                login
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