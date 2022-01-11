import React, { useContext, useEffect } from 'react'
import { Text, TextInput } from 'react-native-paper'
import styled from 'styled-components'
import { colors } from '../../../infrastructure/theme/colors'
import { ScrollView, View } from 'react-native'
import { Label } from './label.component'
import { TouchableWithoutFeedback } from 'react-native'
import {ReportSearchContext} from '../../../services/report-location-search/report-location-search.context'
import { Platform } from 'react-native'
import { ReportEntryContext } from '../../../services/report-entry/report-entry.context'
import { update } from 'lodash'

export const Input = ({category, title, multiline, address, onChange }) => {
    const {reportLocation, activelySearching, notSearching } = useContext(ReportSearchContext)
    const {age, setAge, description, setDescription} = useContext(ReportEntryContext)

    const updateReport = (newData) => {
        if (category === 'age'){
            setAge(newData)
        } else {
            setDescription(newData)
        }
    }

    const isAndroid = Platform.OS === 'android'
    
    return (
        <>
            <Label>{title}</Label>
            {address ? (
                <StyledInput
                    multiline
                    style={{ marginTop: 20, width: 325, height: 70 }}
                    onFocus={() => {
                        activelySearching()
                    }}
                    on
                    placeholder="Search for a location"
                    value={reportLocation}
                    onSubmitEditing={() => {
                        notSearching()
                    }}
                    onChangeText={(location) => {
                        onChange(location)
                    }}
                />
            ) :

                (<InputContainer>
                    {!!multiline ? <StyledMultiLine value = {description} onChangeText={updateReport} /> : <StyledInput value = {age} onChangeText={updateReport} />}
                </InputContainer>
                )}

        </>

    )
}

const InputContainer = styled.View`
    flex: 1
    justifyContent: flex-start
    padding: 16px
`

const StyledInput = styled(TextInput).attrs({ activeUnderlineColor: colors.brand.primary })`
    height:40px
    width: 90%
    align-self: center
`

const StyledMultiLine = styled(TextInput).attrs({ activeUnderlineColor: colors.brand.primary, multiline: true })`
    width: 90%
    align-self: center
`


