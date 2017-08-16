import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableHighlight, Image, ScrollView, TouchableOpacity, TouchableNativeFeedback, Alert, AsyncStorage, BackHandler, Dimensions, Platform } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import Prompt from 'react-native-prompt'
import CalendarEvents from 'react-native-calendar-events'
import CardLoading from '../CardLoading'
import cheerio from 'cheerio-without-node-native'
import moment from 'moment/min/moment-with-locales'
import colors from '../../helpers/colors'
import calendarEvents from 'react-native-calendar-events'

/* Constants */

const CARDS = 'cards';

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

/* Helper Components and data */

const backButton = Platform.OS === 'ios' ? require('../../../assets/img/back-button-ios.png') : require('../../../assets/img/back-button-android.png');

const SelectableText = (props) => <Text {...props} />

SelectableText.defaultProps = {
  selectable: true,
}

const TouchableItem = (props) => {
  return Platform.OS === 'android' ? 
    (<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', true)} delayPressIn={0} {...props} />)
    : (<TouchableOpacity {...props} />);
}


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
  padding: ${props => props.window.width < 400 ? '0px 20px 20px': '10px 30px 30px'};
  padding-top: ${Platform.OS === 'ios' ? '20px' : '10px'}
  width: 100%;
  height: 100%;
`

const StyledDiv = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`

const StyledWrapper = styled.View`
`

const StyledWrapperButtons = styled.View`
  margin-bottom: 40px;
  height: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: flex-end;
`

const StyledFooter = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`

const StyledCardsSubtitle = styled(SelectableText)`
  color: ${colors.black};
  font-size: ${props => props.window.width < 400 ? '20': '24'};
  font-weight: bold;
  margin-bottom: 15px;
`

const StyledCardLinkText = styled(SelectableText)`
  color: ${colors.red};
  font-size: ${props => props.window.width < 400 ? '16': '18'};
  font-weight: 400;
  text-align: right;
`

const StyledNotification = styled(TouchableItem)`
  background-color: ${colors.red};
  width: 100%;
  padding: 2px 23px;
  border-radius: 5;
  margin-top: 0;
  margin-bottom: 9;
`

const StyledNotificationText = styled(SelectableText)`
  color: ${colors.white};
  font-size: 14;
  font-weight: 400;
  text-align: center;
`

const StyledCalendar = styled(Calendar)`
  margin-top: 10px;
  width: 100%;
  align-self: flex-start;
`

const StyledText = styled(SelectableText)`
  font-size: ${props => props.window.width < 400 ? '14': '16'};
  color: ${colors.black};
  font-weight: 400;
  padding-bottom: ${props => props.window.width < 400 ? '6px': '12px'};
  width: 100%;
  text-align: left;
`

const StyledCurrentDate = styled(SelectableText)`
  color: ${colors.black};
  font-size: ${props => props.window.width < 400 ? '14': '16'};
  align-self: flex-start;
  margin-top: ${props => props.window.width < 400 ? '18px': '24px'};
  margin-bottom: ${props => props.window.width < 400 ? '20px': '40px'};
  height: 100%;
`

const StyledTouchableItem = styled(TouchableItem)`
  height: 100%;
  width: 100%;
`

const StyledButton = styled.TouchableOpacity`
`


const StyledButtonIcon = styled.Image`
  width: 32px;
  height: 32px;
  margin-left: 10px;
`

const StyledBackButton = styled.Image`
  margin-left: ${Platform.OS === 'ios' ? '5px' : '20px'};
  margin-top: ${Platform.OS === 'ios' ? '7px' : '20px'};
  width: ${Platform.OS === 'ios' ? '28px' : '20px'};
  height: ${Platform.OS === 'ios' ? '28px' : '20px'};
`
const StyledBox = styled.View`
  align-self: flex-start;
  padding-right: 20px;
  height: 100%;
  width: 100%;
`

const StyledPrompt = styled(Prompt)`
  color: ${colors.black};
`


/* Component */

export default class CardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <StyledTouchableItem title="Back" onPress={() => navigation.navigate('Home')}>
        <StyledBox>
          <StyledBackButton source={backButton} />
        </StyledBox>
      </StyledTouchableItem>
    ),
  })

  constructor(props) {
    super(props);
    this.onSubmitPrompt = this.onSubmitPrompt.bind(this);
    this.readyToRefreshDate = this.readyToRefreshDate.bind(this);
    this.addEventCalendar = this.addEventCalendar.bind(this);

    const todayDateFormat = "[Hoy es ]D[ de ]MMMM[ de ]YYYY";
    const today = moment();
    const {cardData} = this.props.navigation.state.params;
    let expireDate;
    let expireDateFormatted;
    let expireDateCalendar;
    let expireDateWeekDay;
    let daysLeftToExpire;
    let done = false

    if(cardData.cardExpireDate) {
      expireDate = moment(cardData.cardExpireDate, "DD/MM/YYYY");
      expireDateFormatted = expireDate.format("DD[ de ]MMMM[ de ]YYYY").toString();
      expireDateCalendar = expireDate.format("YYYY-MM-DD").toString();
      expireDateWeekDay = expireDate.format("dddd").toString()
      daysLeftToExpire = expireDate.diff(moment().add(-1, "days"), "days");
      daysLeftToExpire = daysLeftToExpire < 1 ? '0' : daysLeftToExpire.toString();
      expireDate = expireDate.format("DD[ de ]MMMM[ de ]YYYY").toString();
      done = true;
    }
  
    this.state = {
      expireDate: expireDate,
      expireDateCalendar: expireDateCalendar,
      expireDateFormatted: expireDateFormatted,
      expireDateWeekDay: expireDateWeekDay,
      daysLeftToExpire: daysLeftToExpire,
      today: today.format(todayDateFormat),
      cardId: cardData.cardId,
      cardName: cardData.cardName,
      cardExpireDate: cardData.cardExpireDate,
      cards: null,
      done: done,
      promptVisible: false,
      favoriteVisible: cardData.cardExpireDate ? false : true,
      editnameVisible: cardData.cardExpireDate ? true : false,
      deleteVisible: cardData.cardExpireDate ? true : false,
      calendar_auth: '',
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home')
      BackHandler.removeEventListener('hardwareBackPress', () => {
        return true;
      })
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  componentDidMount() {
    AsyncStorage.getItem(CARDS).then((result) => {
      if(result){
        this.setState({[CARDS]: JSON.parse(result)});
        return;
      }

      this.setState({[CARDS]: null});
      return;
    }).done();

    if(this.readyToRefreshDate(this.state.cardExpireDate) || this.state.cardExpireDate === null) {
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
        let expireDateWeekDay;
        let daysLeftToExpire;
        let cardExpireDate;

        expireDate = result.format("DD[ de ]MMMM[ de ]YYYY").toString();
        expireDateFormatted = result.format("DD[ de ]MMMM[ de ]YYYY").toString();
        expireDateWeekDay = result.format("dddd").toString()
        daysLeftToExpire = result.diff(moment().add(-1, "days"), "days");
        daysLeftToExpire = daysLeftToExpire < 1 ? '0' : daysLeftToExpire.toString();
        cardExpireDate = result.format("DD/MM/YYYY");
        result = result.format("YYYY-MM-DD").toString();

        this.setState({
          expireDate: expireDate,
          expireDateFormatted: expireDateFormatted,
          expireDateCalendar: result,
          expireDateWeekDay: expireDateWeekDay,
          daysLeftToExpire: daysLeftToExpire,
          cardExpireDate: cardExpireDate,
          done: true
        })

        if(this.readyToRefreshDate(this.state.cardExpireDate)) {
          const expireDateToSave = moment(this.state.expireDate, "DD[ de ]MMMM[ de ]YYYY");
          expireDateToSave = expireDateToSave.format("DD/MM/YYYY").toString()
          const cardData = {
            [this.state.cardId]: {
              cardName: value,
              cardExpireDate: expireDateToSave,
            }
          }

          AsyncStorage.mergeItem(CARDS, JSON.stringify(cardData)).then(() => {
            this.setState({
              cardName: value,
            })
          }).then(() => {
            AsyncStorage.getItem(CARDS).then((result) => {
              if(result){
                this.setState({[CARDS]: JSON.parse(result)});
                return;
              }

              this.setState({[CARDS]: null});
              return;
            })
          }).done()
        }
      }).catch((error) => {
        Alert.alert(`Número de tarjeta: ${this.state.cardId}`,'No se ha podido hacer la consulta al servidor del CRTM, vuelva a intentarlo o corrija el número')
        return this.props.navigation.navigate('Home');
      });
    }
  }

  readyToRefreshDate(cardExpireDate) {
    if(cardExpireDate === null) {
      return false;
    }

    const today = moment();
    const currentSaveDate = moment(cardExpireDate, "DD/MM/YYYY")

    if(today.isBefore(currentSaveDate)) {
      return false;
    }

    return true;
  }

  deleteCard(cardId) {
    let cardsState = this.state.cards;
    delete cardsState[cardId];

    return Alert.alert(
      "",
      "¿Borrar tarjeta?",
      [
        {
          text: 'No', 
          onPress: () => {},
        },
        {
          text: 'Sí',
          onPress: () => {
            AsyncStorage.removeItem(CARDS).then(()=>{
              AsyncStorage.mergeItem(CARDS, JSON.stringify(cardsState)).then(()=>{
                AsyncStorage.getItem(CARDS).then((result) => {
                    const cards = JSON.parse(result);
                    this.setState({
                      favoriteVisible: true,
                      deleteVisible: false,
                      editVisible: false,
                      cards: cards,
                    })

                    return this.props.navigation.navigate('Home');
                  })
                })
            }).done()
          }
        },
      ],
      { cancelable: true }
    );
  }

  onSubmitPrompt(value) {
    if(value) {  
      const expireDate = moment(this.state.expireDate, "DD[ de ]MMMM[ de ]YYYY");
      expireDate = expireDate.format("DD/MM/YYYY").toString()
      const cardData = {
        [this.state.cardId]: {
          cardName: value,
          cardExpireDate: expireDate,
        }
      }

      AsyncStorage.mergeItem(CARDS, JSON.stringify(cardData)).then(() => {
        this.setState({
          promptVisible: false,
          favoriteVisible: false,
          editnameVisible: true,
          deleteVisible: true,
          cardName: value,
        })
      }).then(() => {
        AsyncStorage.getItem(CARDS).then((result) => {
          if(result){
            this.setState({[CARDS]: JSON.parse(result)});
            return;
          }

          this.setState({[CARDS]: null});
          return;
        })
      }).done()

      return;
    }

    this.setState({
      promptVisible: false,
    })
  }

  addEventCalendar(cardId, date, name) {
    // Let's get access before doing anything
    calendarEvents.authorizationStatus()
    .then(status => {
      // if the status was previously accepted, set the authorized status to state
      this.setState({ calendar_auth: status })
      if(status === 'undetermined') {
        // if we made it this far, we need to ask the user for access 
        calendarEvents.authorizeEventStore()
        .then((out) => {
          if(out == 'authorized') {
            // set the new status to the auth state
            this.setState({ calendar_auth: out })
          }
        })
      }
    })
    .catch(error => console.warn('Calendar authentication Error: ', error));

    let parsedDate = moment.utc(date, "DD/MM/YYYY").toISOString();
    const description = 'Recuerda que podrás usar tu tarjeta todo el día';
    const eventTitle = `Expira ${name ? name : 'tu Tarjeta Transporte Público'} con número ${cardId}`;

    const event = {
      notes: description,
      description: description,
      startDate: parsedDate,
      endDate: parsedDate,
      allDay: true,
      alarm: [{
        date: -1
      }],
    }

    if(Platform.OS === 'ios') {
      calendarEvents.saveEvent(eventTitle, event)
      .then(id => {
        Alert.alert("Evento guardado en tu calendario por defecto") 
      }).catch(error => {
        Alert.alert("No se ha podido guardar el evento")
        console.log('Save Event Error: ', error)
      });
    } else {
      calendarEvents.findCalendars()
      .then(calendars => {
        const availableCalendars = calendars.filter((value) => {
            return value.allowsModifications;
        })

        /* I take the first valid calendar, maybe I could add a little to prompt to let user choose whatever calendar he wants */
        const { id } = availableCalendars[0];
        const { title } = availableCalendars[0]

        if(id) {
          calendarEvents.saveEvent(eventTitle, Object.assign(event, {calendarId: `${id}`}))
          .then(id => {
            Alert.alert(`Evento guardado en el calendario ${title}`) 
            // we can get the event ID here if we need it
            // Linking.URL(`cal:${firstTime.getTime()}`);
          }).catch(error => {
            Alert.alert("No se ha podido guardar el evento")
            console.log('Save Event Error: ', error)
          })
        }
      })
      .catch(error => {
        Alert.alert("No se ha podido guardar el evento") 
        console.log('Save Event Error: ', error)
      });
    }
  }

  render() {
    const window = Dimensions.get('window');

    return (
      <StyledView window={window}>
        { this.state.done ?
        <StyledWrapper>
          <StyledDiv>
            <StyledCardsSubtitle window={window}>Tus datos</StyledCardsSubtitle>
            <StyledCardLinkText window={window}>{this.state.cardName?this.state.cardName:null}</StyledCardLinkText>
          </StyledDiv>
          {this.readyToRefreshDate(this.state.cardExpireDate) && 
            <StyledNotification>
              <StyledNotificationText>Fecha actualizada, añade el evento a tu calendario</StyledNotificationText>
            </StyledNotification>
          }
          <StyledText window={window}>Número de tarjeta: {this.state.cardId}</StyledText>
          <StyledText window={window}>Expira el {this.state.expireDateWeekDay} {this.state.expireDate}</StyledText>
          <StyledText window={window}>{this.state.daysLeftToExpire != 1 ? 'Quedan ': 'Queda '}{this.state.daysLeftToExpire}{this.state.daysLeftToExpire != 1 ? ' días': ' día'} de uso</StyledText>
          <StyledCalendar 
            current={this.state.expireDateCalendar}
            markedDates={{[this.state.expireDateCalendar]: {selected: true, marked: true}}}
            monthFormat={'MMMM yyyy'}
            hideArrows={false}
            hideExtraDays={false}
            disableMonthChange={false}
            firstDay={1}
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
              // Uncomment when font is available for the project
              // textDayFontFamily: 'Roboto',
              // textMonthFontFamily: 'Roboto',
              // textDayHeaderFontFamily: 'Roboto',
              textDayFontSize: 12,
              textMonthFontSize: 14,
              textDayHeaderFontSize: 16
            }}
            window={window}
          />
          <StyledFooter>
            <StyledCurrentDate window={window}>{this.state.today}</StyledCurrentDate>
            <StyledWrapperButtons window={window}>
              {this.state.favoriteVisible && <StyledButton onPress={()=>{this.setState({promptVisible: !this.state.promptVisible})}}>
                <StyledButtonIcon source={require('../../../assets/img/favorite-button.png')} window={window} />
                <StyledPrompt
                  title="Pon el nombre de la tarjeta"
                  placeholder="Tarjeta de..."
                  visible={ this.state.promptVisible }
                  cancelText="Cancelar"
                  onCancel={ () => this.setState({
                    promptVisible: false,
                    message: "You cancelled"
                  }) }
                  submitText="Ok"
                  onSubmit={ (value) => this.onSubmitPrompt(value) }                  
                  borderColor="transparent"
                />
              </StyledButton> }
              {this.state.editnameVisible && <StyledButton onPress={()=>{this.setState({promptVisible: !this.state.promptVisible})}}>
                <StyledButtonIcon source={require('../../../assets/img/editname-button.png')} window={window} />
                <StyledPrompt
                  title="Edita el nombre de la tarjeta"
                  placeholder={this.state.cardName}
                  visible={ this.state.promptVisible }
                  cancelText="Cancelar"
                  onCancel={ () => this.setState({
                    promptVisible: false,
                    message: "You cancelled"
                  }) }
                  submitText="Ok"
                  onSubmit={ (value) => this.onSubmitPrompt(value) } 
                  borderColor="transparent"
                />
              </StyledButton> }
              {this.state.deleteVisible && <StyledButton onPress={()=>{this.deleteCard(this.state.cardId)}}>
                <StyledButtonIcon source={require('../../../assets/img/delete-button.png')} window={window} />
              </StyledButton> }
              <StyledButton onPress={()=>{this.addEventCalendar(this.state.cardId, this.state.cardExpireDate, this.state.cardName)}}>
                <StyledButtonIcon source={require('../../../assets/img/calendar-button.png')} window={window} />
              </StyledButton>
            </StyledWrapperButtons>
          </StyledFooter>
        </StyledWrapper>
        :
        <CardLoading />
        }
      </StyledView>
    );
  }
}
