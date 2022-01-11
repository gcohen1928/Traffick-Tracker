import React, { useContext, useState } from 'react'
import { ScrollView, Alert } from 'react-native'
import { Input } from '../components/input.component'
import { Title, CaptionContainer, Caption, SectionHeader, BackButton } from '../components/report.styles'
import { DateInput } from '../components/datepicker.component'
import { Selector } from '../components/select.component'
import { types } from '../../../utility/types.info'
import { ReportAutoComplete } from '../components/report-location.component'
import { LocationSearchContext } from '../../../services/location-search/location-search.context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ChooseImage } from '../components/image-picker.component'
import { SubmitModal } from '../components/submit-modal.component'
import { ReportEntryContext } from '../../../services/report-entry/report-entry.context'
import { useEffect } from 'react/cjs/react.development'
import { TouchableOpacity } from 'react-native-gesture-handler'


export const ReportScreen = ({ navigation }) => {
    const { resetAll } = useContext(ReportEntryContext)

    let submitted = false
    const setSubmitted = (val) => {
        submitted = val
        console.log(submitted + " has changed from " + !submitted)
    }

    const listener = navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === "RESET"){
            return 
        }
        e.preventDefault();

        Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
            [
                { text: "Don't leave", style: 'cancel', onPress: () => { } },
                {
                    text: 'Discard',
                    style: 'destructive',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => {
                        resetAll()
                        navigation.dispatch(e.data.action)
                    }
                    ,
                },
            ],
        );
    })

    useEffect(listener, [navigation, submitted])



    return (

        <KeyboardAwareScrollView>
            <BackButton onPress={() => navigation.navigate("ReportInstructions")} />
            <Title>Report an Incident</Title>
            <CaptionContainer >
                <Caption>{"Note: All fields are optional EXCEPT location. For help, press the button in the top-right"}</Caption>
            </CaptionContainer>
            <SectionHeader title="About You" />
            <Selector category='gender' title="Gender:" options={types.GENDER} />
            <Input category='age' title="Age:" type="number" />

            <SectionHeader title="About The Incident" />
            <Input category='description' title="Incident Description:" multiline={true}></Input>
            <DateInput />
            <ReportAutoComplete />
            <Selector category='type' position={1} title="Type of Trafficking or Assault:" options={types.TYPES_OF_TRAFFICKING} />
            <Selector title="Means of Control:" options={types.MEANS_OF_CONTROL} />
            <ChooseImage />
            <SubmitModal navigation={navigation} />

        </KeyboardAwareScrollView>
    )
}




