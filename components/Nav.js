import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Calendar from './Calendar';
import Profile from './Profile';

const Drawer = createDrawerNavigator();

export default function Nav () {
    return(
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} options={{title: 'HOME'}} />
                <Drawer.Screen name="Profile" component={Profile} options={{title: "PROFILE"}} />
                <Drawer.Screen name="Calendar" component={Calendar} options={{title:'CALENDAR'}} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}