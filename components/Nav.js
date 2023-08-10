import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Calendar from './Calendar';
import Profile from './Profile';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import SignUp from './Login and Auth/SignUp';
import Login from './Login and Auth/Login';


const Drawer = createDrawerNavigator();

function Nav () {

    const { setUserToken } = useContext(AuthContext)


    return(
        
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} options={{title: 'HOME'}} />
                <Drawer.Screen name="Profile" component={Profile} options={{title: "PROFILE"}} />
                <Drawer.Screen name="Calendar" component={Calendar} options={{title:'CALENDAR'}} />
                <Drawer.Screen name="Sign Up" component={SignUp} options={{title: 'SIGN UP'}} />
                <Drawer.Screen name="Login" component={Login} options={{title:'LOGIN'}} />
            </Drawer.Navigator>
       
    )
}

export default Nav