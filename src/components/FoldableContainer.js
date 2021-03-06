import * as React from 'react'
import styled, { css } from 'styled-components'
import { appConstants } from '../utilities'

export class FoldableContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: !!props.initialOpen }
  }

  render() {
    const { children, header, maxContentHeight } = this.props
    return (
      <div>
        <ContainerHeader
          {...this.state}
          {...this.props}
          onClick={this.handleClick}>
          {header}
        </ContainerHeader>
        <ContainerContent {...this.state} maxHeight={maxContentHeight || 200}>
          {children}
        </ContainerContent>
      </div>
    )
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }
}

const ContainerHeader = styled.div`
  width: 100%;
  cursor: pointer;
  :hover {
    color: ${appConstants.colors.darkBrown};
  }
  ::after {
    ${props =>
      props.open
        ? css`
            content: ' \\2B9F';
          `
        : css`
            content: ' \\2B9E';
          `}
  }
`

const ContainerContent = styled.div`
  width: 100%;
  margin-left: 5px;
  transition: all 0.2s ease-out;
  ${props =>
    props.open
      ? css`
          max-height: ${props.maxHeight}px;
        `
      : css`
          max-height: 0px;
          overflow-y: hidden;
        `}
`
