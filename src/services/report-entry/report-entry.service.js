// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, addDoc, doc, collection } from 'firebase/firestore';
import uuid from 'react-native-uuid'
import Geocoder from "react-native-geocoding";
import { API_KEY } from "../../../key";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCG1iAwZVjMQ6A6SJbXOBsMoBlLvTWoFG0",
    authDomain: "trafficking-tracker.firebaseapp.com",
    projectId: "trafficking-tracker",
    storageBucket: "trafficking-tracker.appspot.com",
    messagingSenderId: "511422345061",
    appId: "1:511422345061:web:45a68ca0dbec78ab53bb8c",
    measurementId: "G-HG01L2JR4E"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

Geocoder.init(API_KEY)

const getCoords = async (location) => {
    return Geocoder.from(location)
        .then(json => {
            var res = json.results[0].geometry;
            const { lat, lng } = res.location
            const latDelta = res.viewport.northeast.lat - res.viewport.southwest.lat
            const lngDelta = res.viewport.northeast.lng - res.viewport.southwest.lng
            const newViewPort = { latitude: lat, longitude: lng, latitudeDelta: latDelta, longitudeDelta: lngDelta }
            console.log("lat: " + lat + " long: " + lng) 
            return {viewPort: newViewPort, coordinates: {lat, lng}}
        })
        .catch(error => {console.warn("Error is happening:" + error)});

}



export const storeReport = async (report) => {
    const firestore = getFirestore()
    const ref = collection(firestore, "/Incidents/")
    getCoords(report.reportLocation).then(({viewPort, coordinates}) =>{
        try {
            const res = addDoc(ref, {
                gender: report.gender,
                age: report.age,
                description: report.description,
                location: report.reportLocation,
                coordinates: {lat: coordinates.lat , lng: coordinates.lng},
                viewPort: viewPort,
                photo: report.photoUrl,
                showOnMap: false,
                type: report.type,
                control: report.control,
                dateTime: report.dateTime
            }).then(() => {
                console.log('stored!')
                return true
            }
            )
        } catch (e) {
            console.log(e)
            alert("Report Submission Failed, ensure you are conected to the internet")
            return false 
        }
    })
}


export const uploadImage = async (uri) => {
    try {
        const uploadUrl = await uploadImageAsync(uri);
        console.log(uploadUrl);
        return uploadUrl
    } catch (e) {
        console.log(e);
        alert("Upload failed, sorry :(");
    }
};


async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);
    console.log(result)

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
}