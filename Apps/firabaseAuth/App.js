import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import PhoneNumber from './screens/PhoneNumber'
import auth from '@react-native-firebase/auth';

const App = () => {

    const [confirm, setConfirm] = useState(null);


    async function signIn(phoneNumber) {
        try {
          const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
          setConfirm(confirmation);
        } catch (error) {
          alert(error);
        }
      }
    

    auth().signInWithPhoneNumber('')

    return (
       <PhoneNumber onSubmit={signIn}/>
    )
}

export default App
