import styled from "styled-components";
import { StatusBar } from "react-native";
import { colors } from "../infrastructure/theme/colors";

export const SafeArea = styled.SafeAreaView`
  flex: 1
    ${StatusBar.currentHeight && `marginTop: ${StatusBar.currentHeight}px`};
    background-color: ${colors.bg.primary}
`
