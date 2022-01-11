import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import { Label } from "./label.component"
import { View, Button, Text } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { colors } from "../../../infrastructure/theme/colors"
import { Picker } from "react-native-web"
import { TouchableOpacity } from "react-native"
import { ReportEntryContext } from "../../../services/report-entry/report-entry.context"
import { useContext } from "react/cjs/react.development"


const PickerContainer = styled.View`
    margin-left: 85px
    margin-top: 30px
`

const AndroidButton = styled(TouchableOpacity)`
    color: ${colors.brand.primary}
    background-color: ${colors.brand.primary}
    align-self: center
    width: 100px
    padding: 8px
    margin-top: 20px
    border-radius: 8px
    border-width: 1px
    border-color: ${colors.brand.secondary}
`
const AndroidDateText = styled.Text`
    font-size: 16px
    color: white
    align-self: center
`

export const DateInput = () => {
    const isAndroid = Platform.OS === 'android'

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [show, setShow] = useState(!isAndroid);

    const {setDateTime} = useContext(ReportEntryContext)
    
    useEffect(() => {
        setDateTime(date + " " + time)
    }, [date, time])
    return (
        <>
            <Label>Date and Time</Label>
            {!!isAndroid && 
            <AndroidButton
                onPress={() => setShow(true)}
                color={colors.brand.primary}
                backgroundColor={colors.brand.secondary}>
                <AndroidDateText
                    style={{ alignSelf: "center" }}>
                    {date.getDate()}/{date.getMonth() +
                        1}/{date.getFullYear()}
                </AndroidDateText>

            </ AndroidButton>
            }
            <PickerContainer>
                {show && <DateTimePicker
                    mode='datetime'
                    value={date}
                    onChange={(event, date, time) => {
                       if(isAndroid){
                           setShow(false)
                       }
                        setDate(date)
                        setTime(time)
                    }}
                />}
            </PickerContainer>
        </>

    )
}
