import { View, TextInput, Button, Text } from 'react-native'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login() {



    return(
        <View>
            <TextInput
                placeholder = 'username'
            >
            </TextInput>
            <TextInput
                placeholder = 'password'
            >
            </TextInput>
            <Button
                title = 'lets cancel some plans'
            >
            </Button>
        </View>
    )
}

export default Login