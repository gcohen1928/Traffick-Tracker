import React, {createContext, useState, useEffect} from 'react'

export const ReportSearchContext = createContext()

export const ReportSearchContextProvider = ({children}) => {
    const [reportLocation, setReportLocation] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    return (
        <ReportSearchContext.Provider 
            value = {{
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
                createNewReportLocation: (newReport) => setReportLocation(newReport)
            }}
        >
            {children}
        </ReportSearchContext.Provider>
    )
}