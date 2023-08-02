import { View, Text, Modal, Button } from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function LogOutModal({navigation}) {
    const { setUserToken, logOutModalVisible, setLogOutModalVisible } = useContext(AuthContext)

    async function handleLogout() {
        try{
            setLogOutModalVisible(false)
            await SecureStore.deleteItemAsync('token');
            setUserToken(null);
            navigation.popToTop();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Modal
            visible={logOutModalVisible}
            animationType='slide'
            onRequestClose={() => setLogOutModalVisible(false)}
        >
            <View>
                <Text>Your Session Has Timed Out - Please Login to Continue</Text>
            </View>
        </Modal>
    )
}

export default LogOutModal