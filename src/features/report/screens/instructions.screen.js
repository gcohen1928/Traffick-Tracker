import React, { useEffect, useState } from "react";
import { View, Text, BackHandler, Alert, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SubmitButton } from "../components/report.styles";
import { InstructionText } from "../components/instructions/instructions.component";
import { ScrollView } from "react-native";


export const ReportInstructions = ({ navigation }) => {


    return (
        <ScrollView contentContainerStyle={{
            marginTop: 100,


        }}>
            <View style={{ flex: 1 }}>
                <InstructionText />
            </View>

            <View style = {{marginBottom: 80}}>
                <SubmitButton
                    type = "new"
                    onPress={() => {
                        navigation.navigate("ReportForm")
                    }}
                    title="Create New Report" />
            </View>

        </ScrollView>
    )
}