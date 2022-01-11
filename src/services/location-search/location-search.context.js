import { truncate } from 'lodash'
import React, {createContext, useState, useEffect} from 'react'

export const LocationSearchContext = createContext()

export const LocationSearchContextProvider = ({children}) => {
    const [location, setLocation] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [reportLocation, setReportLocation] = useState('')


    return (
        <LocationSearchContext.Provider 
            value = {{
                location,
                reportLocation,
                isSearching,
                notSearching: () => {
                    setIsSearching(false)
                    console.log('not searching')
                },
                activelySearching: () => {
                    console.log('actively searching')
                    setIsSearching(true)
                },
                createNewLocation: (newLocation) => setLocation(newLocation),
                createNewReport: (newReport) => setReportLocation(newReport)
            }}
        >
            {children}
        </LocationSearchContext.Provider>
    )
}