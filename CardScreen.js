import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableHighlight, ScrollView, StyleSheet, Alert } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
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
  margin: 0;
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
  margin-top: 24px;
  color: ${colors.black};
  font-size: 16;
  align-self: flex-start;
`

/* Component */

export default class CardScreen extends React.Component {
  constructor(props) {
    super(props);

    /* i18n for time*/
    const localeData = {
      monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
      dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
      dayNamesShort: ['D','L','M','X','J','V','S']
    };

    LocaleConfig.locales['es'] = localeData;
    LocaleConfig.defaultLocale = 'es';

    const regularDateFormat = 'DD[ de ]MMMM[ de ]YYYY';
    const todayDateFormat = '[Hoy es ]DD[ de ]MMMM[ de ]YYYY';
    const expireDateFormatCalendar = 'YYYY-MM-DD';
    let expireDate = moment('18/08/2017', 'DD/MM/YYYY');
    let expireDateCalendar = expireDate.format(expireDateFormatCalendar)
    const today = moment();
    
    this.state = {
      expireDate: expireDate.format(regularDateFormat),
      expireDateCalendar: expireDate.format(expireDateFormatCalendar),
      today: today.format(todayDateFormat),
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <StyledView>
        <StyledDiv>
          <StyledCardsSubtitle>Tus datos</StyledCardsSubtitle>
          <StyledCardLinkText>{this.props.navigation.state.params.cardData.cardName?this.props.navigation.state.params.cardData.cardName:null}</StyledCardLinkText>
        </StyledDiv>
        <StyledText>Número de tarjeta: {this.props.navigation.state.params.cardData.cardId?this.props.navigation.state.params.cardData.cardId:0}</StyledText>
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
        <StyledCurrentDate>{this.state.today}</StyledCurrentDate>
      </StyledView>
    );
  }
}

// <StyledCurrentDate>Hoy es {`${today.format("DD")} de ${today.format("MMMM")} de ${today.format("YYYY")}`}</StyledCurrentDate>
