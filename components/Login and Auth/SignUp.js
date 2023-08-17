import React, {useContext, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import { AuthContext } from '../context/AuthContext';

function SignUp() {

    const [newUsername, setNewUserName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const {SignUp} = useContext(AuthContext)
    
    return(
        <View>
            <Text>
                WOrkin' On It
            </Text>
        </View>
      
  )
}

export default SignUp