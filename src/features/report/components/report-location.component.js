import React, { useState, useEffect, useContext } from 'react';
import { API_KEY } from '../../../../key';
import styled from 'styled-components';
import { Card } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ReportSearchContext } from '../../../services/report-location-search/report-location-search.context';
import { Input } from '../../report/components/input.component'
import { Text, Platform } from 'react-native';



export const ReportAutoComplete = ({ isMap, navigation }) => {
    const [predictions, setPredictions] = useState([])
    const { isSearching, reportLocation, createNewReportLocation, notSearching } = useContext(ReportSearchContext);

    const autoCompleteFetch = async () => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${reportLocation}`
        try {
            if (reportLocation.length > 3 && isSearching) {
                const result = await fetch(apiUrl)
                const json = await result.json()
                setPredictions(json.predictions)
                console.log("fire report")
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    const [timer, setTimer] = useState(null)

    useEffect(() => {
        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }
        setTimer(
            setTimeout(() => {
                autoCompleteFetch()
            }, 1000)
        );
    }, [reportLocation])


    useEffect(() => {
        setPredictions([])
    }, [isSearching])

    const onChangeLocation = (newLocation) => {
        createNewReportLocation(newLocation)
    }

    return (
        <>
            <Input address ={true} title="Location:" onChange={onChangeLocation} />
            <SuggestionsList
            >
                {predictions.map((prediction) => {
                    return (
                        <TouchableOpacity
                            style={{ zIndex: 999 }}
                            key={prediction.description}
                            activeOpacity={.8}
                            onPress={() => {
                                createNewReportLocation(prediction.description)
                                notSearching()
                            }}>
                            <Card
                                style = {{width: 325, alignSelf: 'center', backgroundColor: 'gainsboro'}}
                            >
                                <Card.Content>
                                <Text>
                                    {prediction.description}
                                </Text>
                                </Card.Content>
                               
                            </Card>
                        </TouchableOpacity>
                    )
                })}
            </SuggestionsList>

        </>

    );
}

const isAndroid = Platform.OS === "android"

const SuggestionsList =  styled(ScrollView).attrs({
    contentContainerStyle: { justifyContent: 'center', alignSelf: 'center', width: 360, marginRight: 110 },
})`
    z-index: 999
    position: absolute
    margin-top: ${isAndroid? "700px": "990px"}
    width: 500px
`