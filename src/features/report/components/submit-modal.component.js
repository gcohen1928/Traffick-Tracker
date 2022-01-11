import React, { useState, useContext } from "react";
import { Button, Text, View, Alert } from "react-native";
import Modal from "react-native-modal";
import { SubmitButton, DecisionButton } from './report.styles'
import { ReportEntryContext } from '../../../services/report-entry/report-entry.context'
import { Card } from "react-native-paper";

export const SubmitModal = ({ navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const { submitReport } = useContext(ReportEntryContext)

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <SubmitButton title="Submit" onPress={() => {
                Alert.alert(
                    'Are you sure you want to submit this report?',
                    'This cannot be undone',
                    [
                        { text: "Cancel", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Submit',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => {
                                
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'ReportSuccess' }],
                                });
                                submitReport()
                                toggleModal()
                            },

                        },
                    ],
                )
            }} />



            {/* <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    <View
                        style={{ 
                            borderRadius: 10, 
                            alignSelf: 'center', width: 300, height: 200, backgroundColor: 'white' }}
                    >
                        <Text
                        style ={{marginBottom: 20, padding: 15, alignSelf: 'center', fontSize: 20, textAlign: 'center'}}
                        >Are you sure you want to submit this report?</Text>
                        <Button title="Submit" onPress={() => {
                            submitReport()
                            toggleModal()
                            navigation.navigate("ReportSuccess")
                        }} />
                        <Button color='red'title="Cancel" onPress={toggleModal} />
                    </View>
                </View>
            </Modal> */}
        </View>
    );
}
