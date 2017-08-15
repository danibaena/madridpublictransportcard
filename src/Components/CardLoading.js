import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import colors from '../helpers/colors'

/* Helper Components */

const AnimatedView = (props) => <Animatable.View {...props} />

AnimatedView.defaultProps = {
  animation: "pulse",
  easing: "ease-in-out",
  iterationCount: "infinite",
}

const AnimatedText = (props) => <Animatable.Text {...props} />

AnimatedText.defaultProps = {
  animation: "pulse",
  easing: "ease-in-out",
  iterationCount: "infinite",
}

/* Styles */

const StyledView = styled.View`
  flex: 1;
  background-color: #fff;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

const StyledDiv = styled(AnimatedView)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 10;
`

const StyledCardsSubtitle = styled(AnimatedText)`
  background-color: ${colors.softgrey};
  height: 28;
  width: 106;
  margin-bottom: 35;
`

const StyledCardLinkText = styled(AnimatedView)`
  background-color: ${colors.softgrey};
  margin-bottom: 20;
  width: 120;
  height: 21;
`

const StyledCalendarHeader = styled(StyledDiv)`
  margin-top: 50;
  margin-bottom: 24;
`

const StyledCalendar = styled(AnimatedView)`
  background-color: ${colors.softgrey};
  margin-top: 16;
  margin-bottom: 16;
  width: 90%;
  height: 280;
  align-self: center;
`

const StyledText = styled(AnimatedView)`
  background-color: ${colors.softgrey};
  height: 19;
  margin-bottom: 12px;
  width: 50%;
  align-self: flex-start;
`

const StyledMonthName = styled(AnimatedView)`
  background-color: ${colors.softgrey};
  width: 106;
  height: 22;
  margin-bottom: 12px;
`

const StyledArrows = styled(AnimatedView)`
  background-color: ${colors.disabled};
  width: 12;
  height: 22;
`

const StyledCurrentDate = styled(AnimatedView)`
  margin-top: 12;
  padding-top: 12;
  background-color: ${colors.softgrey};
  height: 19;
  width: 50%;
  align-self: flex-start;
`

/* Component */

export default class CardLoading extends React.Component {
  render() {
    return (
      <StyledView>
        <StyledDiv>
          <StyledCardsSubtitle/>
          <StyledCardLinkText/>
        </StyledDiv>
        <StyledText/>
        <StyledText/>
        <StyledText/>
        <StyledCalendarHeader>
          <StyledArrows />
          <StyledMonthName />
          <StyledArrows />
        </StyledCalendarHeader>
        <StyledCalendar/>
        <StyledCurrentDate/>
      </StyledView>
    )
  }
}
