import React from 'react'
import styled from 'styled-components/native'
import { AsyncStorage, Text, View } from 'react-native'
import CardLink from './CardLink'
import colors from './colors'

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
      if(result) {
        this.setState({
          "cards": JSON.parse(result),
          "visible": true,
        })
      }
    }).done();
  }

  renderCardLinks(cards, navigate) {
    if(cards) {
      return Object.keys(cards).map((cardId) => {
        const card = cards[cardId];
        return(<CardLink cardId={cardId} cardName={card.cardName} cardExpireDate={card.cardExpireDate} navigate={navigate}/>)
      });
    }
  }

  render() {
    return (
      <StyledCardsView>
        { this.state.visible &&
          <StyledCardsSubtitle>Tus tarjetas</StyledCardsSubtitle>
        }
        { this.state.visible &&
          this.renderCardLinks(cardsMock, this.props.navigate)
        }
      </StyledCardsView> 
    )
  }
}
