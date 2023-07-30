import { View, TextInput, Button, Text } from 'react-native'
import { useState } from 'react'

function Login({handleLogInSubmit}) {

    const emptyLoginObj = {
        username: '',
        password: ''
    }

    const [login, setLogin] = useState(emptyLoginObj)

    const handleLoginSubmit = () => {
        handleLogInSubmit(login)
        setLogin(emptyLoginObj)
    }

    const handleInputChange = ( id, text ) => {
        setLogin(() => {return(
            {...login, [id]: text }
        )})
    }

    return(
        <View>
            <TextInput
                placeholder = 'username'
                onChangeText={(text) => handleInputChange('username', text)}
                value = {login.username}
            >
            </TextInput>
            <TextInput
                placeholder = 'password'
                onChangeText={(text) => handleInputChange('password', text)}
                value = {login.password}
            >
            </TextInput>
            <Button
                title = 'Login'
                onPress = {handleLoginSubmit}
            >
            </Button>
        </View>
    )
}

export default Login