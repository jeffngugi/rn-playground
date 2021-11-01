import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'

const App = () => {
    return (
        <View style={styles.otpContainer}>
            <Text style={styles.title}>Enter the OTP sent to you to continue</Text>
            <OTPInputView
                style={{width: '100%',paddingVertical:20}}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled = {(code => {
                    console.log(`Code is ${code}, you are good to go!`)
                })}
                placeholderCharacter='-'
                placeholderTextColor='red'
                keyboardAppearance='light'
            />
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    title:{
        alignSelf:'center',
        bottom:-50,
        fontWeight:'bold',
        fontSize:18
    },
    otpContainer:{
        marginHorizontal:20
    },
    borderStyleBase: {
        width: 30,
        height: 45
      },    
      underlineStyleBase: {
        width: 40,
        height: 45,
        borderWidth: 1,
        borderBottomWidth: 1,
        color:'green',
        borderRadius:10

      },
    
      underlineStyleHighLighted: {
        borderColor: "green",
        color:'green'
      },
})
