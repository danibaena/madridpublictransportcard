import React from 'react'
import styled from 'styled-components/native'
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import CardsView from './CardsView'
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

  /* Add this when project is ejected font-family: 'Roboto'; */

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

const StyledCta = styled.TouchableOpacity`
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

const StyledHelpLink = styled.TouchableOpacity`
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
    this.state = {cardId: ''};
    this.onPressCTA = this.onPressCTA.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onPressCTA(navigate, cardData) {
    const minNumCard = 13;
    const maxNumCard = 22;

    if(this.state.cardId === '' || this.state.cardId.length < minNumCard || this.state.cardId.length > maxNumCard) {
      Alert.alert('Debes poner un número de tarjeta válido')
      return;
    }

    navigate('Card', {cardData});
  }

  onChangeText(cardId) {
    const validCardId = cardId.replace(/\s/g,'').replace(/\D/g, '');
    this.setState({cardId: validCardId});
  }

  render() {
    const { navigate } = this.props.navigation;
    const cardData = {
        cardId: this.state.cardId, 
        cardName: null, 
        cardExpireDate: null,
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
            onChangeText={(cardId) => this.onChangeText(cardId)}
          />          
        </StyledInputView>
        <StyledCta onPress={() => this.onPressCTA(navigate, cardData)}>
          <StyledCtaText>{"Consultar mis datos".toUpperCase()}</StyledCtaText>
        </StyledCta>
        <CardsView navigate={navigate} />
      </StyledView>
    )
  }
}
