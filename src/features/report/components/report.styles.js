import React, { useState } from "react";
import styled from "styled-components";
import { colors } from '../../../infrastructure/theme/colors'
import Button from 'react-native-flat-button'
import { TouchableOpacity } from "react-native";





export const BackButton = ({onPress}) => {
    return(
<BackContainer onPress= {() => onPress()}>
        <BackText>Cancel</BackText>
    </BackContainer>
    )
    
}

const BackContainer = styled(TouchableOpacity)`
margin-top: 60px 
margin-left: 20px
    flex: .1
    align-items: flex-start
`

const BackText = styled.Text`
    color: #007AFF
    font-size: 18px
`

export const Title = styled.Text`
    font-size: 40px
    font-weight: bold
    margin-top: 30px
    flex: .1
    align-self: center
    color: ${colors.brand.primary}
`

export const SectionHeader = ({ title }) => {
    return (
        <SectionView>
            <Subtitle>{title}</Subtitle>
        </SectionView>
    )

}

const Subtitle = styled.Text`
    font-size: 24px
    font-weight: bold
    align-self: center
    padding: 10px
    color: ${colors.brand.tertiary}
`

const SectionView = styled.View`
    margin-top: 30px
    border-bottom-width: 3px
    border-color: ${colors.brand.tertiary}
    width: 80%
    align-self: center
    
`

export const Caption = styled.Text`
    font-size: 13px
    font-style: italic
    color: ${colors.ui.primary}
`
export const CaptionContainer = styled.View`
    align-self: center
    padding: 12px
    background-color: ${colors.brand.primary}
    border-radius: 10px
    margin-top: 10px
    max-width: 80%
`


export const SubmitButton = ({ onSubmit, onPress, title, type}) => {

    const fill = type === 'new' ? colors.brand.primary : colors.brand.tertiary
    return (
        <Button
            type="custom"
            onPress={onPress}
            backgroundColor={fill}
            borderColor={colors.brand.secondary}
            borderRadius={10}
            shadowHeight={7}
            containerStyle={{
                alignSelf: 'center',
                width: 350,
                height: 50,
                marginTop: 30,
                marginBottom: 40

            }}

            contentStyle={{
                fontSize: 20
            }}
        >
            {title}
        </Button>


    )
}

export const DecisionButton = ({ onSubmit, onPress, title }) => {
    const color = title === 'Submit' ? 'green' : 'red'
    return (
        <Button
            type="custom"
            onPress={onPress}
            backgroundColor={color}
            borderColor={colors.brand.secondary}
            borderRadius={10}
            shadowHeight={7}
            containerStyle={{
                alignSelf: 'center',
                width: 200,
                height: 50,
                marginTop: 0,

            }}

            contentStyle={{
                fontSize: 20
            }}
        >
            {title}
        </Button>


    )
}
