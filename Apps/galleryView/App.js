import React, {useEffect,useRef, useState} from 'react'
import {View, Text, Dimensions, Image, StyleSheet, SafeAreaView, SafeAreaViewBase, FlatList, Touchable, TouchableOpacity} from 'react-native'
import {PEXEL_KEY} from '../config'
const {width, height} = Dimensions.get('screen')


const API_URL = 'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&page=20'
const IMG_SIZE = 80;
const SPACING = 10;

const fetchImagesFromPexels = async ()=>{
    const data = await  fetch(API_URL, {
        headers:{
            'Authorization':PEXEL_KEY
        }
    })

    const {photos} = await data.json()
    
    return photos;
}


const App = () => {
    const [images, setImages] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(()=>{
        const fetchImages = async  ()=>{
        const images =  await fetchImagesFromPexels()

        setImages(images)
        }

        fetchImages();
    },[])

    const topRef = useRef();
    const thumbRef = useRef();

    const scrollToActiveIndex = (index)=>{
        setActiveIndex(index)
        topRef?.current?.scrollToOffset({
            offset:index * width,
            animated:true
        })

        if(index * (IMG_SIZE + SPACING) - IMG_SIZE /2 > width/2){
            thumbRef?.current?.scrollToOffset({
                offset:index *(IMG_SIZE + SPACING) - width/2 + IMG_SIZE/2,
                animated:true 
            })
        }else{
            thumbRef?.current?.scrollToOffset({
                offset:0,
                animated:true 
            })
        }
    }
    
    if(!images) return <Text>Loading</Text>
    console.log(`active index is ${activeIndex }`)
    return (
        <View style={{flex:1, backgroundColor:'#000'}}>
            <FlatList 
                ref={topRef}
                horizontal
                pagingEnabled
                data={images}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd ={ev => {
                    scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x/width))
                }}
                keyExtractor={item => item.id.toString()}
                renderItem={({item})=>{
                    return <View style={{width, height}}> 
                                <Image source={{uri:item.src.portrait}} style={[StyleSheet.absoluteFill]}/>
                            </View>
                }}
            />

            <FlatList 
                ref={thumbRef}
                horizontal
                pagingEnabled
                data={images}
                keyExtractor={item => item.id.toString()}
                style={{position:'absolute', bottom:IMG_SIZE}}
                contentContainerStyle={{paddingHorizontal:SPACING}}
                renderItem={({item, index})=>{
                    return <TouchableOpacity
                                onPress={()=>scrollToActiveIndex(index)}
                            >
                        <Image source={{uri:item.src.portrait}} style={{
                        width:IMG_SIZE,
                        height:IMG_SIZE,
                        borderRadius:12,
                        marginRight:SPACING,
                        borderWidth:2,
                        borderColor:activeIndex === index ? '#fff': 'transparent'
                    }}/>
                    </TouchableOpacity>
                         
                }}
            />
        </View>
    )
}

export default App
