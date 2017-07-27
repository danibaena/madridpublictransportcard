import React from 'react'
import styled from 'styled-components/native'
import { Platform, Text, View, TouchableHighlight } from 'react-native'
import { Calendar } from 'react-native-calendars'

export default class CardScreen extends React.Component {
  static navigationOptions = {
    title: 'Datos de la tarjeta',
    headerStyle: 'padding: 64px',
  };
  render(props) {
    return (
      <View>
        <Text>Número de tarjeta: {props?props.cardId:0}</Text>
        <Text>Caduca el día</Text>
        <Calendar 
          // Initially visible month. Default = Date()
          current={'2017-08-18'}

          markedDates={Date('2017-08-18')}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {console.log('selected day', day)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {console.log('month changed', month)}}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Do not show days of other months in month page. Default = false
          // hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
        />
      </View>
    );
  }
}