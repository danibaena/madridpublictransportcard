import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableHighlight } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import moment from 'moment'


/* i18n for time*/
const localeData = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  dayNamesShort: ['D','L','M','M','J','V','S']
};

moment.locale('es', localeData);
moment.locale('es');
LocaleConfig.locales['es'] = localeData;

LocaleConfig.defaultLocale = 'es';

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
  padding: 10px 30px 30px;
`

const StyledDiv = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`

const StyledCardsSubtitle = styled.Text`
  color: ${black};
  font-size: 24;
  font-weight: bold;
  align-self: flex-start;
  width: 50%;
`

const StyledCardLinkText = styled.Text`
  color: ${red};
  font-size: 18;
  font-weight: 400;
  align-self: flex-end;
  width: 50%;
`

const StyledCalendar = styled(Calendar)`
  width: 100%;
`

const StyledText = styled.Text`
  font-size: 16;
  font-weight: 500;
  padding-top: 12px;
  borderStyle: solid;
  borderTopWidth: 1px;
  borderTopColor: #282628;
`

export default class CardScreen extends React.Component {
  render(props) {
    const expireDate = '2017-08-18';
    const today = moment();
    return (
      <StyledView>
        
          <StyledCardsSubtitle>Datos de</StyledCardsSubtitle>
          <StyledCardLinkText>Tarjeta de Dani</StyledCardLinkText>
        
        <Text>Número de tarjeta: {props?props.cardId:0}</Text>
        <Text>Caduca el día</Text>
        <Calendar 
          // Initially visible month. Default = Date()
          current={expireDate}

          markedDates={{[expireDate]: {selected: true, marked: true}}}

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
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: `${red}`,
            selectedDayBackgroundColor: `${red}`,
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: `${red}`,
            textDisabledColor: `${disabled}`,
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: `${red}`,
            monthTextColor: `${black}`,
            textDayFontFamily: 'Roboto',
            textMonthFontFamily: 'Roboto',
            textDayHeaderFontFamily: 'Roboto',
            textDayFontSize: 12,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
        <StyledDiv>
          <Text>Hoy</Text>
          <Text>{`${today.format("d")} de ${today.format("MMMM")} de ${today.format("YYYY")}`}</Text>
        </StyledDiv>
      </StyledView>
    );
  }
}