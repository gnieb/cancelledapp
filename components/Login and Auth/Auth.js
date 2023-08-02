import { View, Switch, Modal, TouchableOpacity, Text } from 'react-native'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Login from './Login'
import Home from '../Home'

function Auth({navigation}) {

    const [isLogin, setIsLogin] = useState('login')
    const [modalVisible, setModalVisible] = useState(false)
    const [recentError, setRecentError] = useState(null)
    const { setUserToken } = useContext(AuthContext)
    const toggleSwitch = (e) => {
        setIsLogin(isLogin === 'login' ? 'signup' : 'login')
    }

    async function handleLogInSubmit(formObj) {
        try{
            const r = await fetch(`???/${isLogin}`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formObj)
        })
        if(r.ok){
            const token = r.headers.get('authorization').split(' ')[1]
            await SecureStore.setItemAsync('token', token)
            setUserToken(await SecureStore.getItemAsync('token'))
            navigation.dispatch(
                StackActions.replace('Home')
            )
        } else{
            r.json().then(err => {
                setRecentError(err[Object.keys(err)[0]])
                setModalVisible(true)
            })
        }
        } catch (error) {
            console.log(error)
        }            
    }

    return(
        <View>
            {
                isLogin == 'login' ?
                <View>
                    <Login handleLogInSubmit={handleLogInSubmit} />
                    <Switch onValueChange={toggleSwitch} />
                </View>
                :
                <View>
                    <SignUp handleLogInSubmit = {handleLogInSubmit} />
                    <Switch onValueChange={toggleSwitch} />
                </View>
            }
        </View>
    )
}

export default Auth
