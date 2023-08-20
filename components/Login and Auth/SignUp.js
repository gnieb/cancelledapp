import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button, Pressable} from 'react-native';
import { AuthContext } from '../context/AuthContext';

function SignUp() {

    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const {SignUp} = useContext(AuthContext)
    
    return(
        <View>
            <Text>Sign up to Create An Account</Text>
            <TextInput placeholder='Username'
                value={newUsername}
                onChangeText={text => setNewUsername(text)}
                autoCapitalize='none'
            />
            <TextInput placeholder='Password'
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
                autoCapitalize='none'
            />
            <TextInput placeholder='Email'
                value={newEmail}
                onChangeText={text => setNewEmail(text)}
                autoCapitalize='none'
            />
            <Button onPress={()=>
                {singUp(newUsernamp, newPassword,newEmail,)}}
                title='Create Account'
            /> 
        </View>
      
  )
}


export default SignUp
