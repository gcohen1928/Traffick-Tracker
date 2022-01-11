import React, { useState, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { View } from "react-native";
import { Label } from "./label.component";
import { colors } from "../../../infrastructure/theme/colors";
import { Input } from "./input.component";
import { Ionicons } from "@expo/vector-icons";
import { types } from "../../../utility/types.info";
import { ReportEntryContext } from "../../../services/report-entry/report-entry.context";

export const Selector = ({ category, position, title, options }) => {
    const [isOther, setIsOther] = useState(false);
    const styles = position === 1 ? { marginTop: -30 } : {}

    const {setGender, setType, setControl} = useContext(ReportEntryContext)

    const updateReport = (selectedItem) => {
        if(category === 'gender'){
            setGender(selectedItem)
        } else if (category === 'type'){
            setType(selectedItem)
        } else {
            setControl(selectedItem)
        }
    }

    return (
        <View style={{ styles }}>
            <Label>
                {title}
            </Label>
            <View
                style={{
                    alignSelf: 'center',
                    shadowColor: '#171717',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                }}
            >
                <SelectDropdown
                    data={options}
                    onSelect={(selectedItem, index) => {
                        setIsOther(selectedItem === "Other")
                        updateReport(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {

                        return item
                    }}
                    buttonStyle={{
                        borderWidth: 1,
                        borderColor: colors.brand.secondary,
                        marginTop: 20,
                        backgroundColor: colors.brand.primary,
                        borderRadius: 10,
                        width: 300
                    }}
                    buttonTextStyle={{ color: 'white' }}
                    renderDropdownIcon={() => { return (<Ionicons color='white' size={25} name="chevron-down-outline"></Ionicons>) }}
                    dropdownIconPosition="right"
                    dropdownStyle={{
                        borderRadius: 8
                    }}
                />
            </View>
            {isOther && <Input title="If Other, please specify:" />}
        </View>
    )
}