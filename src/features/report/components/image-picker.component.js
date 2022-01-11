import React, { useState, useContext, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { View, Button, Image, Text } from 'react-native'
import styled from 'styled-components'
import { colors } from '../../../infrastructure/theme/colors'
import { TouchableOpacity } from 'react-native'
import { Label } from './label.component'
import { createNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { ReportEntryContext } from '../../../services/report-entry/report-entry.context'


const checkLibraryPermissions = async () => {
    if (Platform.OS !== "web") {
        const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(permissions)
        if (!permissions.granted) {
            alert("Sorry, we need camera roll permissions to upload any pictures! Go to settings and change this!");
            return false
        }
    }
    return true
}

const checkCameraPermissions = async () => {
    if (Platform.OS !== "web") {
        const permissions = await ImagePicker.requestCameraPermissionsAsync();
        console.log(permissions)
        if (!permissions.granted) {
            alert("Sorry, we need camera permissions to take a picture! Go to settings and change this!");
            return false
        }
    }
    return true
}


export const ChooseImage = () => {
    const [image, setImage] = useState('')
    const {setPhoto} = useContext(ReportEntryContext)

    useEffect(() =>{
        setPhoto(image)
    }, [image])

    let imagePickerText = "Select Image from Camera"
    let imageTakerText = "Take Photo"

    const pickImage = async () => {

        const allowed = await checkLibraryPermissions()
        if (allowed) {
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
            });

            if (!pickerResult.cancelled) {
                setImage(pickerResult.uri)
                imageTakerText = imagePickerText = "Image Selected!"
            }
        }
    }

    const takePicture = async() => {
        const allowed = await checkCameraPermissions()
        if(allowed){
            const takerResult = await ImagePicker.launchCameraAsync()
            if (!takerResult.cancelled){
                setImage(takerResult.uri)
                imageTakerText =  "Image Selected!"
            }
        }
    }

    return (
        <>
            <Label>{'Upload or Take a Photo:'}</Label>
            {!!image && <Image source={{ uri: image }} style={{ marginTop: 20, alignSelf: 'center', width: 200, height: 200 }} />}
            <ImageContainer>
                <ImageSelectorButton onPress={pickImage}>
                    <InnerText>{imagePickerText}</InnerText>
                    <Ionicons
                    style = {{
                        position: 'absolute',
                        color: 'white',
                        marginTop: 9,
                        marginLeft: 270
                    }}
                    size = {25}
                    name = 'image-outline' />
                </ImageSelectorButton>
                <ImageSelectorButton 
                style={{marginTop: 10}}
                onPress={takePicture}>
                    <InnerText>{imageTakerText}</InnerText>
                    <Ionicons
                    style = {{
                        position: 'absolute',
                        color: 'white',
                        marginTop: 9,
                        marginLeft: 210
                    }}
                    size = {25}
                    name = 'camera-outline' />
                </ImageSelectorButton>
                
            </ImageContainer>
        </>

    )

}

const ImageContainer = styled.View`
    flex: 1
    align-items: center
    justify-content: center 
    margin-top: 20px
`

const ImageSelectorButton = styled(TouchableOpacity).attrs({ activeOpacity: 0.5 })`
    background-color: ${colors.brand.primary}
    border-radius: 10px
    width: 78%
    height: 45px
    border-width: 1px
    border-color: ${colors.brand.secondary}
`

const InnerText = styled.Text`
    color: white
    font-size: 18px
    align-self: center
    margin-top: 10px
`