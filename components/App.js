import Nav from './Nav';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';

export default function App () {
    return (
        <NavigationContainer>
            <AuthProvider>
            <Nav />
            </AuthProvider>
        </NavigationContainer>
    )
}