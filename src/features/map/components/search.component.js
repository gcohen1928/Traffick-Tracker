import React, { useContext } from 'react'
import { Searchbar } from "react-native-paper"
import styled from "styled-components"
import { LocationSearchContext } from '../../../services/location-search/location-search.context'


const SearchContainer = styled.View`
  padding: 16px;
  position: absolute
  z-index:999
  margin-top: 10px
  top:40px
  width: 100%
`

export const Search = ({onChange }) => {
    const { activelySearching, notSearching, createNewLocation, location} = useContext(LocationSearchContext)
    return (
        <SearchContainer>
            <Searchbar
                onFocus={activelySearching}
                placeholder="Search for a location"
                icon="human"
                value={location}
                onSubmitEditing={() => {
                    notSearching()
                }}
                onChangeText={(location) => {
                    onChange(location)
                }}
            />
        </SearchContainer>
    )
};
