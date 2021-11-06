import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStore} from 'redux'
import rootReducer from './reducers'
import {Provider} from 'react-redux'
import {SafeAreaView    } from 'react-native'
import List from './List'


const App = () => {

    const store = createStore(rootReducer)

    return (
       <Provider store={store}>
           <SafeAreaView style={{flex:1}}>
                <List />
           </SafeAreaView>
       </Provider>
    )
}

export default App

const styles = StyleSheet.create({})
