import React, { useState, useEffect, useContext } from 'react';
import { API_KEY } from '../../../../key';
import { Search } from './search.component';
import styled from 'styled-components';
import { Card } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native';
import { LocationSearchContext } from '../../../services/location-search/location-search.context';
import { Input } from '../../report/components/input.component'



export const AutoCompleteSearch = ({ isMap, navigation }) => {
    const json = { predictions: [{ description: "Hoboken, NJ" }, { description: "Hudson Yards, NY" }, { description: "Huntington, NY" }, { description: "Hicksville, NY" }] }
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [error, setError] = useState({})
    const [predictions, setPredictions] = useState(json.predictions)
    const { isSearching, location, createNewLocation, notSearching } = useContext(LocationSearchContext);



    const autoCompleteFetch = async () => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${location}`
        try {
            if (location.length > 3 && isSearching) {
                const result = await fetch(apiUrl)

                const json = await result.json()
                setPredictions(json.predictions)
                console.log("fire")
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
    }, [location])


    useEffect(() => {
        setPredictions([])
    }, [isSearching])

    const onChangeLocation = (newLocation) => {
        createNewLocation(newLocation)
    }

    const SuggestionsList = isMap ? (styled(ScrollView).attrs({
        contentContainerStyle: { justifyContent: 'center', alignSelf: 'center', width: 360, marginRight: 110 },
    })`
        z-index: 999
        position: absolute
        margin-top: 120px
        width: 500px
    `) : (

        styled(ScrollView).attrs({
            contentContainerStyle: { justifyContent: 'center', alignSelf: 'center', width: 360, marginRight: 110 },
        })`
            z-index: 999
            position: absolute
            margin-top: 800px
            width: 500px
        `
    )


    return (
        <>
            <Search location={location} onChange={onChangeLocation} on/>
            <SuggestionsList>
                {predictions.map((prediction) => {
                    return (
                        <TouchableOpacity
                            style={{ zIndex: 999 }}
                            key={prediction.description}
                            activeOpacity={.8}
                            onPress={() => {
                                createNewLocation(prediction.description)
                                notSearching()
                            }}>
                            <Card>
                                <Card.Title title={prediction.description} />
                            </Card>
                        </TouchableOpacity>
                    )
                })}
            </SuggestionsList>

        </>

    );
}






