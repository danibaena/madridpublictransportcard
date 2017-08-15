import React from 'react'
import styled from 'styled-components/native'
import { Text, View, ScrollView, Image, Dimensions, Platform } from 'react-native'
import colors from '../../helpers/colors'

/* Helper Components */

const Title = (props) => <Text {...props} />

Title.defaultProps = {
  selectable: true,
}

const Paragraph = (props) => <Text {...props} />

Paragraph.defaultProps = {
  selectable: true,
}

/* Styles */

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
  padding: ${props => props.window.width < 400 ? '20px': '30px'};
`

const StyledImageWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`

const StyledTitle = styled(Title)`
  color: ${colors.black};
  font-size: ${props => props.window.width < 400 ? '20': '24'};
  font-weight: bold;
`

const StyledParagraph = styled(Paragraph)`
  margin-top: ${props => props.window.width < 400 ? '7px': '15px'};
  margin-bottom: ${props => props.window.width < 400 ? '15px': '30px'};
  color: ${colors.black};
  font-size: ${props => props.window.width < 400 ? '14': '16'};
  align-self: flex-start;
`

const StyledImage = styled.Image`
  margin-top: 15px;
  align-self: center;
  flex-shrink: 1;
  height: 200;
`

const StyledFooter = styled(Paragraph)`
  font-size: 12;
  font-weight: 500;
  color: ${colors.black};
  width: 100%;
  text-align: center;
  padding-bottom: ${props => props.window.width < 400 ? '40px': '60px'};
`

/* Component */

export default class CardScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const window = Dimensions.get('window');

    return (
      <StyledView window={window}>
        <StyledTitle window={window}>¿Cómo sé cuál es el número de mi Tarjeta Transporte Público?</StyledTitle>
        <StyledImageWrapper>
          <StyledImage resizeMode="contain" source={require('../../../assets/img/ttp.png')} />
        </StyledImageWrapper>
        <StyledParagraph window={window}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledTitle window={window}>Question</StyledTitle>
        <StyledParagraph window={window}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledTitle window={window}>Question</StyledTitle>
        <StyledParagraph window={window}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledTitle window={window}>Question</StyledTitle>
        <StyledParagraph window={window}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledTitle window={window}>Question</StyledTitle>
        <StyledParagraph window={window}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus pharetra massa ac semper. Suspendisse nec arcu nunc. Curabitur gravida molestie velit. Maecenas pellentesque ligula vitae tincidunt accumsan. Phasellus sit amet magna quis odio dignissim ornare molestie at lacus. Donec viverra pharetra accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pellentesque dui nec risus bibendum tincidunt.</StyledParagraph>
        <StyledFooter window={window}>Crafted with ❤️ from Madrid</StyledFooter>
      </StyledView>
    );
  }
}