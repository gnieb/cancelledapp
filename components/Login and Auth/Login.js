import { View, TextInput, Button, Text} from 'react-native'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(null)
    const {login} = useContext(AuthContext)

    const loginValidation = loginValidator => {
        setLoginError(loginValidator)
    }

    return(
        <View>
            <Text>Lets Cancel Some Plans</Text>
            <TextInput
                placeholder = 'username'
                value={username}
                autoCapitalize='none'
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                placeholder = 'password'
                value={password}
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />
            <Button
                title = 'Ready to Recharge'
                onPress={() => {login(username, password, loginValidation)}}
            /> 
        </View>
    )
}

export default Login
