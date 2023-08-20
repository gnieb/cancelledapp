import { View, TextInput, Button, Text, Pressable } from 'react-native'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = useContext(AuthContext)

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
                onPress={() => {login(username, password)}}
            >
            </Button>
        </View>
    )
}

export default Login
