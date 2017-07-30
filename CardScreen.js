import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableHighlight, Image, ScrollView, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import Prompt from 'react-native-prompt'
import CalendarEvents from 'react-native-calendar-events'
import CardLoading from './CardLoading'
import cheerio from 'cheerio-without-node-native'
import moment from 'moment/min/moment-with-locales'
import colors from './colors'


/* i18n for time*/
const localeData = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['D','L','M','X','J','V','S']
};
moment.locale('es');
moment.updateLocale('es', localeData);

LocaleConfig.locales['es'] = localeData;
LocaleConfig.defaultLocale = 'es';

/* Styles */

const StyledView = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      justifyContent: 'flex-start'
    }
  }
})`
  flex: 1;
  background-color: #fff;
  flex-direction: column;
  padding: 10px 30px 30px;
  width: 100%;
`

const StyledDiv = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const StyledWrapper = styled.View`
`

const StyledWrapper2 = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`


const StyledFooter = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const StyledCardsSubtitle = styled.Text`
  color: ${colors.black};
  font-size: 24;
  font-weight: bold;
  margin-bottom: 35;
`

const StyledCardLinkText = styled.Text`
  color: ${colors.red};
  font-size: 18;
  font-weight: 400;
  text-align: right;
`

const StyledCalendar = styled(Calendar)`
  margin-top: 32px;
  width: 100%;
  align-self: flex-start;
  border-bottom-width: 0.5;
  borderColor: ${colors.black};
  borderStyle: solid;
`

const StyledText = styled.Text`
  font-size: 16;
  color: ${colors.black};
  font-weight: 500;
  padding-bottom: 12px;
  width: 100%;
  text-align: left;
`

const StyledCurrentDate = styled.Text`
  color: ${colors.black};
  font-size: 16;
  align-self: flex-start;
  margin-top: 24px;
`

const StyledButton = styled.TouchableOpacity`

`

const StyledCalendarButton = styled.Image`
  width: 42px;
  height: 42px;
  margin-top: 12px;
  align-self: flex-end;
`

const StyledFavoriteButton = styled.Image`
  width: 42px;
  height: 42px;
  margin-top: 11px;
  margin-right: 20px
  align-self: flex-end;
`

/* Component */

export default class CardScreen extends React.Component {
  constructor(props) {
    super(props);

    const regularDateFormat = 'DD[ de ]MMMM[ de ]YYYY';
    const todayDateFormat = '[Hoy es ]DD[ de ]MMMM[ de ]YYYY';
    const expireDateFormatCalendar = 'YYYY-MM-DD';
    const today = moment();
    const {cardData} = this.props.navigation.state.params;
    
    this.state = {
      expireDate: '',
      expireDateCalendar: '',
      expireDateFormatted: '',
      today: today.format(todayDateFormat),
      cardId: cardData.cardId,
      cardName: cardData.cardName,
      cards: null,
      done: false,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("cards").then((result) => {
      if(result){
        this.setState({"cards": JSON.parse(result)});
      }
    }).done();

    const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/"><soapenv:Header/><soapenv:Body><tem:ConsultaSaldoTarjeta1><tem:sNumeroTP>${this.state.cardId}</tem:sNumeroTP><tem:sLenguaje>es</tem:sLenguaje><tem:sTipoApp>APP_SALDO_ANDROID</tem:sTipoApp></tem:ConsultaSaldoTarjeta1></soapenv:Body></soapenv:Envelope>`
    fetch('http://www.citram.es:50081/VENTAPREPAGOTITULO/VentaPrepagoTitulo.svc?wsdl', {
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
      let $ = cheerio.load(response._bodyInit, {xmlMode:true});
      $ = cheerio.load($('a\\:sResulXMLField').text(), {xmlMode:true})

      let result;
      let resultRecarga;
      let resultCarga;
      let $titulos = $('titulos');
      
      if ($titulos.find("[desc='Fecha de caducidad de la recarga']").html() !== null) {
        resultRecarga = $titulos.find("[desc='Fecha de caducidad de la recarga']")[0].attribs.value;
        resultRecarga = moment(resultRecarga, "YYYY-MM-DD");
      }

      if ($titulos.find("[desc='Fecha de caducidad de la carga']").html() !== null) {
        resultCarga = $titulos.find("[desc='Fecha de caducidad de la carga']")[0].attribs.value;
        resultCarga = moment(resultCarga, "YYYY-MM-DD");
      }

      if(resultRecarga && resultCarga) {
        result = resultRecarga.isAfter(resultCarga) ? resultRecarga : resultCarga;  
      } else if (resultRecarga) {
        result = resultRecarga;
      } else {
        result = resultCarga;
      }
      
      if(!result){
        throw CardError;
      }

      let expireDate;
      let expireDateFormatted;

      expireDate = result.format("DD/MM/YYYY").toString();
      expireDateFormatted = result.format("DD[ de ]MMMM[ de ]YYYY").toString();
      result = result.format("YYYY-MM-DD").toString();

      this.setState({
        expireDate: expireDate,
        expireDateFormatted: expireDateFormatted,
        expireDateCalendar: result,
        done: true
      })
    }).catch((error) => {
      Alert.alert('','No se ha podido hacer la consulta al servidor del CRTM, vuelva a intentarlo o corrija el número')
      return this.props.navigation.navigate('Home');
    });
  }

  saveData(value) {

 // AsyncStorage.setItem('cards', JSON.stringify(ORIG), () => {
 //   AsyncStorage.mergeItem('cards', JSON.stringify(DELTA), () => {
 //     AsyncStorage.getItem('cards', (err, result) => {
 //       console.log('cards result of merged object: %O', JSON.parse(result))
 //     })
 //   })
 // })
    AsyncStorage.mergeItem('cards', JSON.stringify(value)).done()

    // AsyncStorage.getItem("cards").then((cards) => {
    //   AsyncStorage.mergeItem('cards', JSON.stringify(value))
    // }).done();

    // AsyncStorage.getItem("cards").then((cards) => {
    //   const result = this.editOrPushCard(JSON.parse(cards), value)
    //   this.setState({"cards": result});
    // }).done();
    // AsyncStorage.setItem('cards', JSON.stringify(this.state.cards));
  }

  render() {
    const today = moment();
    const cardsData = {
      '2510010062803': {
        cardName: 'Tarjeta de Mengano',
        cardExpireDate: today.format("DD/MM/YYYY")
      },
      '0010000323869': {
        cardName: 'Tarjeta de Fulano',
        cardExpireDate: today.format("DD/MM/YYYY")
      }
    }
    const expireDateFormatted = moment(this.state.expireDate).format('DD/MM/YYYY');
    const newCard = {
        [this.state.cardId]: {
          cardName: this.state.cardName,
          cardExpireDate: expireDateFormatted,
        }
    }

    // this.saveData(newCard)

    return (
      <StyledView>
        { this.state.done ?
        <StyledWrapper>
          <StyledDiv>
            <StyledCardsSubtitle>Tus datos</StyledCardsSubtitle>
            <StyledCardLinkText>{this.state.cardName?this.state.cardName:null}</StyledCardLinkText>
          </StyledDiv>
          <StyledText>Número de tarjeta: {this.state.cardId}</StyledText>
          <StyledText>Expira el día {this.state.expireDate}</StyledText>
          <StyledCalendar 
            // Initially visible month. Default = Date()
            current={this.state.expireDateCalendar}

            markedDates={{[this.state.expireDateCalendar]: {selected: true, marked: true}}}

            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // style={calendarStyles.arrow}
            theme={{
              calendarBackground: '#ffffff',
              textSectionTitleColor: `${colors.red}`,
              selectedDayBackgroundColor: `${colors.red}`,
              selectedDayTextColor: '#ffffff',
              todayTextColor: `${colors.black}`,
              dayTextColor: `${colors.red}`,
              textDisabledColor: `${colors.disabled}`,
              dotColor: `${colors.black}`,
              selectedDotColor: `${colors.white}`,
              arrowColor: `${colors.red}`,
              monthTextColor: `${colors.black}`,
              textDayFontFamily: 'Roboto',
              textMonthFontFamily: 'Roboto',
              textDayHeaderFontFamily: 'Roboto',
              textDayFontSize: 12,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
          <StyledFooter>
            <StyledCurrentDate>{this.state.today}</StyledCurrentDate>
            <StyledWrapper2>
              <StyledButton>
                <StyledFavoriteButton source={require('./assets/img/favorite-button.png')} />
              </StyledButton>
              <StyledButton>
                <StyledCalendarButton source={require('./assets/img/calendar-button.png')} />
              </StyledButton>
            </StyledWrapper2>
          </StyledFooter>
        </StyledWrapper>
        :
        <CardLoading />
        }
      </StyledView>
    );
  }
}


// <Prompt
//     title="Pon el nombre de la tarjeta"
//     placeholder="Tarjeta de Fulano"
//     defaultValue="Hello"
//     visible={ this.state.promptVisible }
//     onCancel={ () => this.setState({
//       promptVisible: false,
//       message: "You cancelled"
//     }) }
//     onSubmit={ (value) => this.setState({
//       promptVisible: false,
//       message: `You said "${value}"`
//     }) }/>