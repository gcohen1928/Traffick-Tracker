import React, { createContext, useContext, useState, useEffect } from 'react'
import { ReportSearchContext } from '../report-location-search/report-location-search.context'
import { uploadImage, storeReport } from './report-entry.service'


export const ReportEntryContext = createContext()

export const ReportEntryContextProvider = ({ children, navigation }) => {
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [type, setType] = useState('')
    const [control, setControl] = useState('')
    const [photo, setPhoto] = useState('')
    const [uploading, setUploading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const { reportLocation, createNewReportLocation } = useContext(ReportSearchContext)

    // useEffect(() =>{
    //     console.log("Should be true: " +  submitted)
    // }, [submitted])



    const submitReport = async () => {
        let stored = false
        try {
            if (photo) {
                uploadImage(photo).then((photoUrl) => {
                    stored = storeReport({
                        gender, age, description, dateTime, type, photoUrl, control, reportLocation
                    })
                })
            } else {
                stored = storeReport({
                    gender, age, description, dateTime, type, photoUrl: photo, control, reportLocation
                })
            }
            return stored
        } catch (e) {
            console.log(e)
            console.log(stored)
            return stored
        }

    }

    const resetAll = () => {
        setGender('')
        setAge('')
        setDescription('')
        setDateTime('')
        setType('')
        setControl('')
        setPhoto('')
        createNewReportLocation('')
    }

    return (
        <ReportEntryContext.Provider
            value={{
                gender,
                age,
                description,
                dateTime,
                type,
                control,
                photo,
                setGender,
                setAge,
                setDescription,
                setDateTime,
                setType,
                setControl,
                setPhoto,
                submitReport,
                resetAll
            }}>
            {children}
        </ReportEntryContext.Provider>
    )
}