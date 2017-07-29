import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import colors from './colors'

const StyledView = styled.View`
  flex: 1;
  background-color: #fff;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

const StyledDiv = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10;
`

const StyledCardsSubtitle = styled.Text`
  background-color: ${colors.softgrey};
  height: 28;
  width: 106;
  margin-bottom: 70;
`

const StyledCardLinkText = styled.View`
  background-color: ${colors.disabled};
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

const StyledCalendar = styled.View`
  background-color: ${colors.disabled};
  margin-top: 16;
  margin-bottom: 16;
  width: 84%;
  height: 194;
  align-self: center;
`

const StyledText = styled.View`
  background-color: ${colors.softgrey};
  height: 19;
  margin-bottom: 12px;
  width: 100%;
`

const StyledMonthName = styled.View`
  background-color: ${colors.softgrey};
  width: 106;
  height: 22;
  margin-bottom: 12px;
`

const StyledArrows = styled.View`
  background-color: ${colors.disabled};
  width: 12;
  height: 22;
`

const StyledCurrentDate = styled.View`
  margin-top: 12;
  padding-top: 12;
  background-color: ${colors.softgrey};
  height: 19;
  width: 100%;
  align-self: flex-start;
`

const StyledLine = styled.View`
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
          <StyledCardsSubtitle />
          <StyledCardLinkText />
        </StyledDiv>
        <StyledText />
        <StyledText />
        <StyledCalendarHeader>
          <StyledArrows />
          <StyledMonthName />
          <StyledArrows />
        </StyledCalendarHeader>
        <StyledCalendar />
        <StyledLine />
        <StyledCurrentDate />
      </StyledView>
    )
  }
}