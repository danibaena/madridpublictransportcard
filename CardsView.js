import React from 'react'
import styled from 'styled-components/native'
import { AsyncStorage, Text, View } from 'react-native'
import CardLink from './CardLink'
import colors from './colors'

/* Styles */

const StyledCardsView = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const StyledCardsSubtitle = styled.Text`
  color: ${colors.black};
  font-size: ${props => props.window.width < 400 ? '18': '24'};
  font-weight: bold;
  margin-bottom: 12;
`

/* Component */

export default class CardsView extends React.Component {
  constructor(props) {
    super(props);
    this.renderCardLinks = this.renderCardLinks.bind(this);
    this.state = {
      cards: null,
      visible: false,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("cards").then((result) => {
      const cards = JSON.parse(result);

      if(cards && Object.keys(cards).length != 0) {
        this.setState({
          "cards": cards,
          "visible": true,
        })
      }
    }).done();
  }

  renderCardLinks(cards, navigate) {
    if(cards) {
      return Object.keys(cards).map((cardId) => {
        const card = cards[cardId];

        return(card ? <CardLink key={cardId} cardId={cardId} cardName={card.cardName} cardExpireDate={card.cardExpireDate} navigate={navigate} window={this.props.window} /> : null)
      });
    }
  }

  render() {
    return (
      <StyledCardsView>
        { this.state.visible &&
          <StyledCardsSubtitle window={this.props.window}>Tus tarjetas</StyledCardsSubtitle>
        }
        { this.state.visible &&
          this.renderCardLinks(this.state.cards, this.props.navigate)
        }
      </StyledCardsView> 
    )
  }
}
