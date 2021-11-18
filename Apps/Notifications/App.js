import React, {useEffect }from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native'
import PushNotification from "react-native-push-notification";

let cars = [
    {
        id:1,
      color: "purple",
      type: "minivan",
      registration: new Date('2017-01-03'),
      capacity: 7
    },
    {
        id:2,
      color: "red",
      type: "station wagon",
      registration: new Date('2018-03-03'),
      capacity: 5
    },
    {
        id:6,
        color: "purple",
        type: "minivan",
        registration: new Date('2017-01-03'),
        capacity: 7
      },
      {
          id:3,
        color: "red",
        type: "station wagon",
        registration: new Date('2018-03-03'),
        capacity: 5
      },
      {
          id:4,
        color: "purple",
        type: "minivan",
        registration: new Date('2017-01-03'),
        capacity: 7
      },
      {
          id:5,
        color: "red",
        type: "station wagon",
        registration: new Date('2018-03-03'),
        capacity: 5
      }
]

const App = () => {

    useEffect(() => {
        createChannels();
    }, []);


    const createChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "test-channel",
                channelName: "Test Channel"
            }
        )
    }



    const handleNotification = (item, index) => {
        PushNotification.cancelAllLocalNotifications();

        PushNotification.localNotification({
            channelId: "test-channel",
            title: "You clicked on "+item.type ,
            message: 'notification message',
            bigText: 'notification big text goes here  date: new Date(Date.now() + 20 * 1000),  date: new Date(Date.now() + 20 * 1000),',
            color: "red",
            id: item.id,
            bigPictureUrl: " date: new Date(Date.now() + 20 * 1000),",
            bigLargeIconUrl: "https://www.pexels.com/photo/woman-wearing-black-spaghetti-strap-top-415829/",
            picture: "https://www.pexels.com/photo/woman-wearing-black-spaghetti-strap-top-415829/"
        });

        PushNotification.localNotificationSchedule({
            channelId: "test-channel",
            title: "You clicked on this is a scheduced "+item.type ,
            message: 'notification message',
            bigText: 'notification big text goes here',
            color: "red",
            id: item.id,
            bigPictureUrl: "https://www.pexels.com/photo/woman-wearing-black-spaghetti-strap-top-415829/",
            bigLargeIconUrl: "https://www.pexels.com/photo/woman-wearing-black-spaghetti-strap-top-415829/",
            picture: "https://www.pexels.com/photo/woman-wearing-black-spaghetti-strap-top-415829/",
            date: new Date(Date.now() + 20 * 1000),
        });   
       
    }


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cars}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                    onPress={() => { handleNotification(item, index) }}
                    >
                        <View style={styles.item}>
                           <Text style={styles.title}>{item.type}</Text>
                           <Text style={styles.subtitle}>{item.color}</Text>


                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default App

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    item: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#cccccc',
        borderRadius: 5,
        margin: 7,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        margin: 10,
    },
    subtitle: {
        fontSize: 20,
        margin: 10,
        color: '#999999',
    }
})
