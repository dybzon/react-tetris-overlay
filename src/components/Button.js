import React from 'react'
import styled from 'styled-components'
import { appConstants } from '../utilities'

export const Button = props => (
  <StyledButton onClick={props.onClick}>{props.children}</StyledButton>
)

const StyledButton = styled.div`
  width: 100px;
  background-color: ${appConstants.colors.puff};
  border-radius: 5px;
  color: ${appConstants.colors.black};
  transition: background-color 0.3s linear;
  margin-left: 4px;

  :hover {
    background-color: ${appConstants.colors.pink};
  }
`
