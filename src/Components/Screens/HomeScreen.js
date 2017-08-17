import React from 'react'
import styled from 'styled-components/native'
import { Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert, Keyboard, Dimensions, Platform } from 'react-native'
import ActionButton from 'react-native-action-button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CardsView from '../CardsView'
import colors from '../../helpers/colors'

/* Constants */

const MIN_NUM_CARD = 13;
const MAX_NUM_CARD = 22;

/* Helper Components */

const SelectableText = (props) => <Text {...props} />

SelectableText.defaultProps = {
  selectable: true,
}

/* Styles */

const StyledView = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: props => {
    return {
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  }
})`
  flex: 1;
  background-color: #fff;
  flex-direction: column;
  padding: ${props => props.window.width > 414 ? '30px': props.window.width > 375 ? '25px' : '20px'};
  padding-top: ${Platform.OS === 'ios' ? '40px' : (props => props.window.width > 414 ? '30px': props.window.width > 375 ? '25px' : '20px')}
  width: 100%;
  height: 100%;
`

const StyledMainTitle = styled(SelectableText)`
  color: ${colors.black};
  font-size: ${props => props.window.width < 400 ? '40': '46'};
  font-weight: bold;
  font-family: 'Roboto';
  align-self: flex-start;
`

const StyledInputView = styled.View`
  width: 100%;
  margin-top: ${props => props.window.width < 400 ? '80': '112'};
`

const StyledInput = styled.TextInput`
  color: ${colors.black};
  font-size: ${props => props.window.width < 400 ? '14': '18'};
  ${Platform.OS === 'android' ? "font-family: 'Roboto-Medium';" : 'font-weight: 500;' }
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

const StyledCtaText = styled(SelectableText)`
  color: ${colors.white};
  font-size: ${props => props.window.width < 400 ? '14': '18'};
  ${Platform.OS === 'android' ? "font-family: 'Roboto-Medium';" : 'font-weight: 500;' }
  text-align: center;
`

const StyledCardsView = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const StyledCardsSubtitle = styled(SelectableText)`
  color: ${colors.black};
  font-size: 24;
  font-weight: bold;
  font-family: 'Roboto';
  margin-bottom: 12;
`

const StyledHelpButton = styled.Image`
  width: 55px;
  height: 55px;
`

const StyledActionButtonLink = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
`

const StyledActionButton = styled(ActionButton)`
  width: 90px;
  height: 75px;
  position: relative;
  left: 30px;
  align-self: flex-end;
  margin-bottom: 40px;
`

/* Component */

export default class HomesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onPressCTA = this.onPressCTA.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.state = {
      cardId: '',
    };
  }

  onPressCTA(navigate, cardData) {
    Keyboard.dismiss();

    if(this.state.cardId === '' || this.state.cardId.length < MIN_NUM_CARD || this.state.cardId.length > MAX_NUM_CARD) {
      Alert.alert('Debes poner un número de tarjeta válido')
      return;
    }

    navigate('Card', {cardData});
  }

  onChangeText(cardId) {
    let validCardId = cardId.replace(/\s/g,'').replace(/\D/g, '');
    if(validCardId.length > MIN_NUM_CARD) {
      validCardId = validCardId.substr(validCardId.length - MIN_NUM_CARD)
    }
    this.setState({cardId: validCardId});
  }

  render() {
    const { navigate } = this.props.navigation;
    const cardData = {
          cardId: this.state.cardId, 
          cardName: null, 
          cardExpireDate: null,
    }
    const window = Dimensions.get('window');

    return (
      <StyledView 
        keyboardShouldPersistTaps="always"
        resetScrollToCoords={{ x: 0, y: 0 }}
        enableAutoAutomaticScroll={true}
        enableResetScrollToCoords={true}
        enableOnAndroid={true}
        extraScrollHeight={window.width < 400 ? 60 : 120}
        window={window}
      >
        <StyledMainTitle window={window}>Madrid Tarjeta Transporte Público</StyledMainTitle>
        <StyledInputView window={window}>
          <StyledInput 
            placeholder="Pon el número de tarjeta"
            placeholderTextColor={colors.black}
            multiline={false}
            editable={true}
            autoCorrect={false}
            blurOnSubmit={false}
            underlineColorAndroid='transparent'
            underlineColor='transparent'
            keyboardType='numeric'
            maxLength={22}
            onChangeText={(cardId) => this.onChangeText(cardId)}
            onSubmitEditing={() => this.onPressCTA(navigate, cardData)}
            window={window}
          />          
        </StyledInputView>
        <StyledCta onPress={() => this.onPressCTA(navigate, cardData)} window={window}>
          <StyledCtaText window={window}>{"Consultar los datos".toUpperCase()}</StyledCtaText>
        </StyledCta>
        <CardsView navigate={navigate} window={window}/>
        <StyledActionButton
          buttonColor="rgba(255,255,255,1)"
          bgColor="#ffffff"
          icon={<StyledActionButtonLink onPress={() => { navigate('Help')}}><StyledHelpButton source={require('../../../assets/img/help-button.png')} /></StyledActionButtonLink>}
          degrees={0}
          offsetY={0}
          hideShadow={true}
          />
      </StyledView>
    )
  }
}