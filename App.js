import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

const white = '#ffffff'
const black = '#282629'
const grey = '#9B9B9B'
const red = '#DD382C'

const StyledView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding: 60px 30px 30px;
`;
  /* font-family: 'Roboto'; */

const StyledMainTitle = styled.Text`
  color: ${black};
  font-size: 38;
  font-weight: bold;
  align-self: flex-start;
`

const StyledInputView = styled.View`
  width: 100%;
  margin-top: 140px;
`

const StyledInput = styled.TextInput`
  color: ${black};
  font-size: 18;
  font-weight: 500;
  padding: 0
  padding-bottom: 7;
  border-width: 0;
  border-style: solid;
  border-bottom-width: 2;
  border-bottom-color: ${red};
`

const StyledCta = styled.TouchableHighlight`
  background-color: ${red};
  width: 100%;
  padding: 12px 22px;
  border-radius: 5;
  margin-top: 40;
  margin-bottom: 36;
`

const StyledCtaText = styled.Text`
  color: ${white};
  font-size: 18;
  font-weight: 500;
  text-align: center;
`

const StyledCardsView = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const StyledCardsSubtitle = styled.Text`
  color: ${black};
  font-size: 24;
  font-weight: bold;
  margin-bottom: 12;
`

const StyledCardLink = styled.TouchableHighlight`
  padding-top: 8;
  padding-bottom: 6;
`

const StyledCardLinkText = styled.Text`
  color: ${red};
  font-size: 18;
  font-weight: 400;
`

const StyledHelp = styled.Image`
  width: 50;
  align-self: flex-end;
`

export default class App extends React.Component {
  render() {
    return (
      <StyledView>
        <StyledMainTitle>Madrid Tarjeta Transporte Público</StyledMainTitle>
        <StyledInputView>
          <StyledInput 
            autoFocus={true}
            blurOnSubmit={true}
            placeholder="Introduce tu número de tarjeta"
            placeholderTextColor={black}
            multiline={true}
            editable={true}
            autoCorrect={false}
            underlineColorAndroid='transparent'
            underlineColor='transparent'
            keyboardType='numeric'
            maxLength={16}
          />          
        </StyledInputView>
        <StyledCta>
          <StyledCtaText>{"Dime mis datos".toUpperCase()}</StyledCtaText>
        </StyledCta>
        <StyledCardsView>
          <StyledCardsSubtitle>Tus tarjetas</StyledCardsSubtitle>
          <StyledCardLink>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink>
            <StyledCardLinkText>Tarjeta Ana</StyledCardLinkText>
          </StyledCardLink>
        </StyledCardsView>
      </StyledView>
    );
  }
}
