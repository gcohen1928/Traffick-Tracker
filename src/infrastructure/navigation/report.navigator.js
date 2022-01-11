import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import { ReportScreen } from '../../features/report/screens/report.screen'
import { ReportSearchContextProvider } from '../../services/report-location-search/report-location-search.context'
import { ReportEntryContextProvider } from '../../services/report-entry/report-entry.context'
import { ReportSuccess } from '../../features/report/screens/success.screen'
import { ReportInstructions } from '../../features/report/screens/instructions.screen'


const ReportStack = createStackNavigator()

export const ReportNavigator = ({ route, navigation }) => {
    return (

        <ReportSearchContextProvider>
            <ReportEntryContextProvider>
                <ReportStack.Navigator
                    screenOptions={{ headerShown: false, }}
                >
                    <ReportStack.Screen name="ReportInstructions" component={ReportInstructions} />
                    <ReportStack.Screen name="ReportForm" component={ReportScreen} />
                    <ReportStack.Screen name="Help" component={ReportScreen} />
                    <ReportStack.Screen 
                    options={{gestureEnabled: false}}
                    name= "ReportSuccess" component={ReportSuccess} />
                </ReportStack.Navigator>
            </ReportEntryContextProvider>
        </ReportSearchContextProvider>



    )
}