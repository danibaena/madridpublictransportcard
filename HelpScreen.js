import React from 'react'
import styled from 'styled-components/native'
import { Text, View, ScrollView, Image } from 'react-native'
import colors from './colors'

const StyledView = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      justifyContent: 'flex-start'
    }
  }
})`
  background-color: #fff;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  padding: 10px 30px 30px;
`

const StyledImageWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`

const StyledTitle = styled.Text`
  color: ${colors.black};
  font-size: 24;
  font-weight: bold;
`

const StyledParagraph = styled.Text`
  margin-top: 15px;
  margin-bottom: 30px;
  color: ${colors.black};
  font-size: 16;
  align-self: flex-start;
`

const StyledImage = styled.Image`
  margin-top: 15px;
  align-self: center;
  flex-shrink: 1;
  height: 200;
`

const StyledFooter = styled.Text`
  font-size: 12;
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`

export default class CardScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledView>
        <StyledTitle>¿Cómo sé cuál es el número de mi Tarjeta Transporte Público?</StyledTitle>
        <StyledImageWrapper>
          <StyledImage resizeMode="contain" source={require('./assets/img/ttp.png')} />
        </StyledImageWrapper>
        <StyledParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledTitle>Question</StyledTitle>
        <StyledParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledTitle>Question</StyledTitle>
        <StyledParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledTitle>Question</StyledTitle>
        <StyledParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledTitle>Question</StyledTitle>
        <StyledParagraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledFooter>Crafted with ❤️ from Madrid</StyledFooter>
      </StyledView>
    );
  }
}