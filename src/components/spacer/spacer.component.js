import React from "react"
import styled, { useTheme } from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
}

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
}

const SpacerView = styled.View`
  ${({ variant }) => variant}
`

export const Spacer = ({ position, size, children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>
};

const getVariant = (position, size, theme) => {
  const sizeIndex = sizeVariant[size]
  const property = positionVariant[position]
  return `${property}:${theme.space[sizeIndex]}`
};

Spacer.defaultProps = {
  position: "top",
  size: "small",
};