import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,
    Button
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

export default function Login() {

    const [name, setName] = useState('ssd');
    const [age, setAge] = useState('');
    const [form, setForm] = useState(true)

    useEffect(() => {
        createTable()
        getData()
    }, []);


    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        console.log(results)
                        if (len > 0) {
                            // navigation.navigate('Home');
                            var userName = results.rows.item(0).Name
                            var userAge = results.rows.item(0).Age
                            setForm(false)
                            setName(userName)
                            setAge(userAge)
                        }
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }
    }

    const setData = async()=>{
        if(name.length === 0 || age.length === 0 ){
            Alert.alert("Warning!", "Please write your data")
        }else{
            try {
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "INSERT INTO Users (Name, Age) VALUES (?,?)",
                        [name, age]
                    );
                    setForm(false)
                })
            } catch (error) {
                
            }
        }
    }

    const updateData = async() =>{
        console.log('update data from this function')
        if( name.length == 0){
            Alert.alert("Warning!", "Please write your data")
        }else{
            try {
                await db.transaction(async (tx) =>{
                    tx.executeSql(
                        "UPDATE Users SET Name=?",
                        [name],
                        ()=>{Alert.alert('Success', 'Name succesfully updated')},
                        error => console.log(error)
                    )
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
   

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users "
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
            )
        })
    }

    const removeData = ()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "DELETE FROM Users",
                [],
                ()=>{setForm(true)},
                error=>console.log(error)
            )
        })
    }
 

    return (
        <View style={styles.body}>
            <Image
                style={styles.logo}
                source={require('./assets/sql.png')}
            />
            {!form?(
            <View>
            <Text style={styles.text}>
                Hello mr. {name}
            </Text>
            
            <Text style={styles.text}>
                Kindly update your name below
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Update your name'
                onChangeText={(value) => setName(value)}
                value={name}
            />
            <Button
            onPress={updateData}
            title="Update"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
            <View style={{marginVertical:10}}/>

            <Button
            onPress={removeData}
            title="Delete"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
            </View>
            ):(
            <>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your age'
                onChangeText={(value) => setAge(value)}
            />
            <Button
            onPress={setData}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
            </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        backgroundColor: '#0080ff',
    },
    logo: {
        width: 200,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 30,
        color: '#ffffff',
        marginBottom: 130,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    }
})