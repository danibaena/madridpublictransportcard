import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableHighlight } from 'react-native'

const white = '#ffffff'
const black = '#282629'
const grey = '#9B9B9B'
const red = '#DD382C'
const disabled = '#F7D1CE'

const StyledView = styled.View`
  background-color: #fff;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 30px 30px;
`

const StyledText = styled.Text`
  font-size: 12;
  font-weight: 500;
  padding-top: 120px;
  width: 100%;
  text-align: center;
`

export default class CardScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledView>
        <StyledText>Crafted with ❤️ from Madrid</StyledText>
      </StyledView>
    );
  }
}