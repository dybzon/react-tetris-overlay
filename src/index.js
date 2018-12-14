import React from 'react'
import styled from 'styled-components'
export default class MyModule extends React.Component {
  render() {
    return <AwesomeDiv>This is awesome!</AwesomeDiv>
  }
}

const AwesomeDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: pink;
`
