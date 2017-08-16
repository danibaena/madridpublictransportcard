import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableOpacity } from 'react-native'
import colors from '../helpers/colors'

/* Styles */

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

const StyledCardLink = styled.TouchableOpacity`
  width: 100%;
`

const StyledCardLinkText = styled.Text`
  padding-top: 8;
  padding-bottom: 6;
  color: ${colors.red};
  font-size: ${props => props.window.width < 400 ? '14': '18'};
  font-weight: 400;
`

const StyledCardLinkDate = styled.Text`
  color: ${colors.red};
  font-size: ${props => props.window.width < 400 ? '18': '22'};
  font-weight: 500;
`

const StyledView = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
`

/* Component */

export default class CardLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cardData = {
        cardId: this.props.cardId, 
        cardName: this.props.cardName, 
        cardExpireDate: this.props.cardExpireDate,
    }
    return (
      <StyledCardLink onPress={() => this.props.navigate('Card', {cardData})}>
        <StyledView>
          <StyledCardLinkText window={this.props.window}>{this.props.cardName}</StyledCardLinkText>
          <StyledCardLinkDate window={this.props.window}>{this.props.cardExpireDate}</StyledCardLinkDate>
        </StyledView>
      </StyledCardLink>
    )
  }
}