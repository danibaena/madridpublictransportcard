import React from 'react'
import styled from 'styled-components/native'
import { Platform, AppRegistry, StyleSheet, Text, View, ScrollView, TextInput, TouchableHighlight, Alert } from 'react-native'
import cheerio from 'cheerio-without-node-native'
import moment from 'moment'

const white = '#ffffff'
const black = '#282629'
const grey = '#9B9B9B'
const red = '#DD382C'

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
  color: ${black};
  font-size: 46;
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
  width: 100%;
`

const StyledCardLinkText = styled.Text`
  padding-top: 8;
  padding-bottom: 6;
  color: ${red};
  font-size: 18;
  font-weight: 400;
`

const StyledHelp = styled.Image`
  width: 50;
  align-self: flex-end;
`

export default class HomesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  };

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
  };

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
    return (
      <StyledView>
        <StyledMainTitle>Madrid Tarjeta Transporte Público</StyledMainTitle>
        <StyledInputView>
          <StyledInput 
            autoFocus={true}
            placeholder="Pon tu número de tarjeta"
            placeholderTextColor={black}
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
        <StyledCta onPress={console.log("Taka")}>
          <StyledCtaText>{"Consultar mis datos".toUpperCase()}</StyledCtaText>
        </StyledCta>
        <StyledCardsView>
          <StyledCardsSubtitle>Tus tarjetas</StyledCardsSubtitle>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Ana</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Ana</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
          <StyledCardLink onPress={() => navigate('Card')}>
            <StyledCardLinkText>Tarjeta Dani</StyledCardLinkText>
          </StyledCardLink>
        </StyledCardsView>
      </StyledView>
    );
  }
}