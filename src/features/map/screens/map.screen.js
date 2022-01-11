import React, { useEffect, useState, useContext, useRef } from "react";
import MapView from 'react-native-maps'
import styled from "styled-components";
import { PROVIDER_GOOGLE, Heatmap } from "react-native-maps";
import { AutoCompleteSearch } from "../components/auto-complete.component";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import { LocationSearchContext } from "../../../services/location-search/location-search.context";
import Geocoder from "react-native-geocoding";
import { API_KEY } from "../../../../key";
import { uniqueId } from "lodash";
import {Text} from 'react-native'


points = [
    { latitude: 40.7828, longitude: -74.0065, weight: 1 },
    { latitude: 41.7121, longitude: -74.0042, weight: 1 },
    { latitude: 40.7102, longitude: -75.0060, weight: 1 },
    { latitude: 40.7123, longitude: -74.0052, weight: 1 },
    { latitude: 40.7032, longitude: -74.0042, weight: 1 },
    { latitude: 40.7198, longitude: -74.0024, weight: 1 },
    { latitude: 41.7223, longitude: -74.0053, weight: 1 },
    { latitude: 40.7181, longitude: -74.0042, weight: 1 },
    { latitude: 40.7124, longitude: -74.0023, weight: 1 },
    { latitude: 40.7648, longitude: -74.0012, weight: 1 },
    { latitude: 41.7128, longitude: -74.0027, weight: 1 },
    { latitude: 40.7223, longitude: -74.0153, weight: 1 },
    { latitude: 40.7193, longitude: -74.0052, weight: 1 },
    { latitude: 40.7241, longitude: -75.0013, weight: 1 },
    { latitude: 41.7518, longitude: -74.0085, weight: 1 },
    { latitude: 40.7599, longitude: -74.0093, weight: 1 },
    { latitude: 41.7523, longitude: -74.0021, weight: 1 },
    { latitude: 40.7342, longitude: -74.0152, weight: 1 },
    { latitude: 40.7484, longitude: -75.0042, weight: 1 },
    { latitude: 40.7929, longitude: -75.0023, weight: 1 },
    { latitude: 40.7292, longitude: -74.0013, weight: 1 },
    { latitude: 40.7940, longitude: -74.0048, weight: 1 },
    { latitude: 40.7874, longitude: -74.0052, weight: 1 },
    { latitude: 40.7824, longitude: -74.0024, weight: 1 },
    { latitude: 40.7232, longitude: -74.0094, weight: 1 },
    { latitude: 41.7342, longitude: -74.0152, weight: 1 },
    { latitude: 41.7484, longitude: -74.0012, weight: 1 },
    { latitude: 41.7929, longitude: -74.0073, weight: 1 },
    { latitude: 41.7292, longitude: -74.0013, weight: 1 },
    { latitude: 41.7940, longitude: -74.0058, weight: 1 },
    { latitude: 41.7874, longitude: -74.0352, weight: 1 },
    { latitude: 41.7824, longitude: -74.0024, weight: 1 },
    { latitude: 41.7232, longitude: -74.0094, weight: 1 },
    { latitude: 41.0342, longitude: -75.0152, weight: 1 },
    { latitude: 41.0484, longitude: -75.0012, weight: 1 },
    { latitude: 41.0929, longitude: -75.0073, weight: 1 },
    { latitude: 41.0292, longitude: -74.0013, weight: 1 },
    { latitude: 41.0940, longitude: -74.0068, weight: 1 },
    { latitude: 41.0874, longitude: -74.0052, weight: 1 },
    { latitude: 41.0824, longitude: -74.0024, weight: 1 },
    { latitude: 41.0232, longitude: -74.0014, weight: 1 },
    { latitude: 41.7874, longitude: -74.0352, weight: 1 },
    { latitude: 31.594915, longitude: -84.224236, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 39.370121, longitude: -74.438942, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 39.370121, longitude: -74.438942, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 39.370121, longitude: -74.438942, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 39.370121, longitude: -74.438942, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 39.370121, longitude: -74.438942, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 39.370121, longitude: -74.438942, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 39.370121, longitude: -74.438942, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 39.370121, longitude: -74.438942, weight: 1 },
    { latitude: 39.741550, longitude: -90.256218, weight: 1 },
    { latitude: 43.828850, longitude: -115.837860, weight: 1 },
    { latitude: 25.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 37.630322, longitude: -104.790543, weight: 1 },
    { latitude: 35.618671, longitude: 91.271286, weight: 1 },
    { latitude: 35.678970, longitude: 35.678970, weight: 1 },
    { latitude: 37.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 31.370121, longitude: -74.438942, weight: 1 },
    { latitude: 31.370121, longitude: -74.438942, weight: 1 },
    { latitude: 31.370121, longitude: -74.438942, weight: 1 },
    { latitude: 31.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 31.370121, longitude: -74.438942, weight: 1 },
    { latitude: 31.741550, longitude: -90.256218, weight: 1 },
    { latitude: 41.828850, longitude: -115.837860, weight: 1 },
    { latitude: 21.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 31.630322, longitude: -104.790543, weight: 1 },
    { latitude: 31.618671, longitude: 91.271286, weight: 1 },
    { latitude: 31.678970, longitude: 35.678970, weight: 1 },
    { latitude: 31.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 31.370121, longitude: -74.438942, weight: 1 },
    { latitude: 31.741550, longitude: -90.256218, weight: 1 },
    { latitude: 41.828850, longitude: -115.837860, weight: 1 },
    { latitude: 21.750156, longitude: -80.279640, weight: 1 },
    { latitude: 41.329334, longitude: -73.094406, weight: 1 },
    { latitude: 31.630322, longitude: -104.790543, weight: 1 },
    { latitude: 31.618671, longitude: 91.271286, weight: 1 },
    { latitude: 31.678970, longitude: 35.678970, weight: 1 },
    { latitude: 31.865894, longitude: -88.259773, weight: 1 },
    { latitude: 41.006950, longitude: -91.973419, weight: 1 },
    { latitude: 31.370121, longitude: -74.438942, weight: 1 },
    { latitude: 31.370121, longitude: -74.438942, weight: 1 },
    { latitude: 31.370121, longitude: -74.438942, weight: 1 },

];


Geocoder.init(API_KEY)

const Map = styled(MapView)`
    height: 100%
    width: 100%
`

export const MapScreen = ({ navigation }) => {
    const [viewPort, setViewPort] = useState()
    const { isSearching, notSearching, location, isReporting } = useContext(LocationSearchContext)
    const mapref = useRef(null)

    const getCoords = async (location) => {
        Geocoder.from(location)
            .then(json => {
                var res = json.results[0].geometry;
                const { lat, lng } = res.location
                const latDelta = res.viewport.northeast.lat - res.viewport.southwest.lat
                const lngDelta = res.viewport.northeast.lng - res.viewport.southwest.lng
                const newViewPort = { latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: lngDelta }
                setViewPort(newViewPort)
                console.log(mapref.current.animateToRegion(newViewPort))
            })
            .catch(error => console.warn(error));

    }

    useEffect(() => {
        if (location.length > 3 && !isSearching && !isReporting) {
            console.log('this is')
            getCoords(location)
        }
    }, [location])

    return (
        <>
            <AutoCompleteSearch isMap={true} />
            <Map
                ref={mapref}
                provider={PROVIDER_GOOGLE}
                onPress={() => {
                    if (isSearching) {
                        dismissKeyboard()
                        notSearching()
                    }
                }}
                initialRegion={{
                    latitude: 37.09024,
                    latitudeDelta: 23.560000000000002,
                    longitude: -97.712891,
                    longitudeDelta: 57.45,
                }}
                loadingEnabled

            >
                 {points.map((point) => {
                    return (
                    <MapView.Marker
                    flat = {true}
                    opacity={0.0}
                    calloutAnchor= {{ x: 0.5, y: .9 }}
                    key = {uniqueId()}
                    title = {uniqueId()}
                    coordinate = {{latitude: point.latitude, longitude: point.longitude }}
                    >
                        <MapView.Callout onPress = {() => {}}>
                            <Text>Ross Eye Raped Me</Text>
                        </MapView.Callout>

                    </MapView.Marker>
                    
                    )
                   
                })}
                <Heatmap
                    points={points}
                    radius={40}
                    opacity={1}
                    gradient={{
                        colors: ["navy", "blue", "green", "yellow", "red"],
                        startPoints: Platform.OS === 'ios' ? [0.01, 0.04, 0.1, 0.45, 0.5] :
                            [0.1, 0.25, 0.5, 0.75, 1],
                        colorMapSize: 2000
                    }}
                >
                </Heatmap>
            </Map>
        </>




    )
}