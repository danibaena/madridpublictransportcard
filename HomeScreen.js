import React from 'react'
import styled from 'styled-components/native'
import { Platform, AppRegistry, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight, Image, Alert } from 'react-native'
import CardLink from './CardLink'
import cheerio from 'cheerio-without-node-native'
import moment from 'moment'
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

  _onPressButton() {
    // const cardId = "2510010062803";
    const cardId = this.state.text;
    if(cardId.length < 13) {
      console.log("tiki")
    } else {
      console.log("tuku")
    }
    const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:ConsultaSaldoTarjeta1><tem:sNumeroTP>${cardId}</tem:sNumeroTP><tem:sLenguaje>es</tem:sLenguaje><tem:sTipoApp>APP_SALDO_ANDROID</tem:sTipoApp></tem:ConsultaSaldoTarjeta1></soapenv:Body></soapenv:Envelope>`

    return fetch('http://www.citram.es:50081/VENTAPREPAGOTITULO/VentaPrepagoTitulo.svc?wsdl', {
      method: 'POST',
      headers: {
        'host': 'www.citram.es:50081',
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'Connection': 'keep-alive',
        'content-type': 'text/xml; charset=utf-8',
        'soapaction': 'http://tempuri.org/IVentaPrepagoTitulo/ConsultaSaldoTarjeta1'
      },
      body: body
    }).then((response) => {
      console.log("Entrandito")
      Alert.alert("Taka")
    }).catch((error) => {
    });
  }

  parseCardData(response) {
    let $ = response;
    $ = cheerio.load($('a\\:sResulXMLField').text(), {xmlMode:true});
    
    let result;
    if($('titulos').find("[desc='Fecha de caducidad de la carga']").html()!==null){
        result = $('titulos').find("[desc='Fecha de caducidad de la carga']")[0].attribs.value;
    }

    let date;
    if(result !== undefined){
        date = moment(result, 'YYYY-MM-DD');
        date = date.format('DD-MM-YYYY');
    } else{
        console.log('Error on the API request');
        return 'Error on the API request';
    }
    Alert.alert("TAKA", date)
  }

  render() {
    const { navigate } = this.props.navigation;
    const cardData = {
        cardName: this.props.cardName, 
        cardId: this.props.cardId, 
        cardExpireDate: this.props.cardExpireDate,
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
            maxLength={16}
            onSubmitEditing={(text) => this.setState({text})}
          />          
        </StyledInputView>
        <StyledCta onPress={() => navigate('Card', cardData)}>
          <StyledCtaText>{"Consultar mis datos".toUpperCase()}</StyledCtaText>
        </StyledCta>
        <StyledCardsView>
          <StyledCardsSubtitle>Tus tarjetas</StyledCardsSubtitle>
          <CardLink cardId="1234567890123" cardName="Tarjeta Dani" cardExpireDate="18/08/2017" navigate={navigate}/>
          <CardLink cardId="1234567890123" cardName="Tarjeta Ana" cardExpireDate="18/08/2017" navigate={navigate}/>
        </StyledCardsView>
      </StyledView>
    )
  }
}