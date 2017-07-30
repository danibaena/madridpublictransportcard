import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import colors from './colors'

const StyledView = styled.View`
  flex: 1;
  background-color: #fff;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

const StyledDiv = styled(Animatable.View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10;
`

const StyledCardsSubtitle = styled(Animatable.Text)`
  background-color: ${colors.softgrey};
  height: 28;
  width: 106;
  margin-bottom: 35;
`

const StyledCardLinkText = styled(Animatable.View)`
  background-color: ${colors.softgrey};
  margin-bottom: 20;
  width: 120;
  height: 21;
`

const StyledCalendarHeader = styled(StyledDiv)`
  margin-top: 50;
  margin-bottom: 24;
  border-bottom-width: 1;
  borderColor: ${colors.black};
  borderStyle: solid;
`

const StyledCalendar = styled(Animatable.View)`
  background-color: ${colors.softgrey};
  margin-top: 16;
  margin-bottom: 16;
  width: 90%;
  height: 280;
  align-self: center;
`

const StyledText = styled(Animatable.View)`
  background-color: ${colors.softgrey};
  height: 19;
  margin-bottom: 12px;
  width: 50%;
  align-self: flex-start;
`

const StyledMonthName = styled(Animatable.View)`
  background-color: ${colors.softgrey};
  width: 106;
  height: 22;
  margin-bottom: 12px;
`

const StyledArrows = styled(Animatable.View)`
  background-color: ${colors.disabled};
  width: 12;
  height: 22;
`

const StyledCurrentDate = styled(Animatable.View)`
  margin-top: 12;
  padding-top: 12;
  background-color: ${colors.softgrey};
  height: 19;
  width: 50%;
  align-self: flex-start;
`

const StyledLine = styled(Animatable.View)`
  margin-top: 10;
  margin-bottom: 10;
  border-bottom-width: 1;
  borderColor: ${colors.black};
  borderStyle: solid;
`

export default class CardLoading extends React.Component {
  render() {
    return (
      <StyledView>
        <StyledDiv>
          <StyledCardsSubtitle animation="pulse" easing="ease-in-out" iterationCount="infinite" />
          <StyledCardLinkText animation="pulse" easing="ease-in-out" iterationCount="infinite" />
        </StyledDiv>
        <StyledText animation="pulse" easing="ease-in-out" iterationCount="infinite" />
        <StyledText animation="pulse" easing="ease-in-out" iterationCount="infinite" />
        <StyledCalendarHeader>
          <StyledArrows animation="pulse" easing="ease-in-out" iterationCount="infinite" />
          <StyledMonthName animation="pulse" easing="ease-in-out" iterationCount="infinite" />
          <StyledArrows animation="pulse" easing="ease-in-out" iterationCount="infinite" />
        </StyledCalendarHeader>
        <StyledCalendar animation="pulse" easing="ease-in-out" iterationCount="infinite" />
        <StyledLine animation="pulse" easing="ease-in-out" iterationCount="infinite" />
        <StyledCurrentDate animation="pulse" easing="ease-in-out" iterationCount="infinite" />
      </StyledView>
    )
  }
}

// <Animatable.Text>Taka</Animatable.Text>