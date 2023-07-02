import { Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native";
export default function Home () {
    return (
        <SafeAreaView>
            <Text>Welcome To Canceled</Text>
            <Text>An Introverts Best Friend</Text>
            <Text>A FullStack Application by Grace & Kimberly</Text>
            <Pressable onPress={() => navigation.navigate('Profile')} >
                <Text>Profile</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Calendar')}>
                <Text>Calendar</Text>
            </Pressable>
        </SafeAreaView>
    )
}