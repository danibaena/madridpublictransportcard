import React from 'react'
import styled from 'styled-components/native'
import { Platform, AppRegistry, AsyncStorage, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight, Image, Alert } from 'react-native'
import CardLink from './CardLink'
import moment from 'moment/min/moment-with-locales'
import colors from './colors'

const StyledView = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
  }
})`
  flex: 1;
  background-color: #fff;
  flex-direction: column;
  padding: 30px;
`

  /* font-family: 'Roboto'; */

const StyledMainTitle = styled.Text`
  color: ${colors.black};
  font-size: 46;
  font-weight: bold;
  align-self: flex-start;
`

const StyledInputView = styled.View`
  width: 100%;
  margin-top: 60;
`

const StyledInput = styled.TextInput`
  color: ${colors.black};
  font-size: 18;
  font-weight: 500;
  padding: 0
  padding-bottom: 7;
  border-width: 0;
  border-style: solid;
  border-bottom-width: 1.5;
  border-bottom-color: ${colors.red};
`

const StyledCta = styled.TouchableHighlight`
  background-color: ${colors.red};
  width: 100%;
  padding: 12px 22px;
  border-radius: 5;
  margin-top: 40;
  margin-bottom: 36;
`

const StyledCtaText = styled.Text`
  color: ${colors.white};
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
  color: ${colors.black};
  font-size: 24;
  font-weight: bold;
  margin-bottom: 12;
`

const StyledHelpLink = styled.TouchableHighlight`
  margin-top: 30px;
  align-self: flex-end;
`

const StyledHelp = styled.Image`
  width: 40px;
  height: 40px;
`

export default class HomesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const { navigate } = this.props.navigation;
    const cardData = {
        cardId: this.state.text, 
    }
    return (
      <StyledView>
        <StyledMainTitle>Madrid Tarjeta Transporte Público</StyledMainTitle>
        <StyledHelpLink onPress={() => navigate('Help')}>
          <StyledHelp source={require('./assets/img/help-button.png')} />
        </StyledHelpLink>
        <StyledInputView>
          <StyledInput 
            placeholder="Pon tu número de tarjeta"
            placeholderTextColor={colors.black}
            multiline={true}
            editable={true}
            autoCorrect={false}
            underlineColorAndroid='transparent'
            underlineColor='transparent'
            keyboardType='numeric'
            maxLength={22}
            onChangeText={(text) => this.setState({text})}
          />          
        </StyledInputView>
        <StyledCta onPress={() => navigate('Card', {cardData})}>
          <StyledCtaText>{"Consultar mis datos".toUpperCase()}</StyledCtaText>
        </StyledCta>
        <StyledCardsView>
          <StyledCardsSubtitle>Tus tarjetas</StyledCardsSubtitle>
          <CardLink cardId="2510010062803" cardName="Tarjeta Dani" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
        </StyledCardsView>
      </StyledView>
    )
  }
}