import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableOpacity, TouchableNativeFeedback, ScrollView, Image, Dimensions, Platform } from 'react-native'
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

const TouchableItem = (props) => {
  return Platform.OS === 'android' ? 
    (<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', true)} delayPressIn={0} {...props} />)
    : (<TouchableOpacity {...props} />);
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
  font-family: 'Roboto';
  margin-bottom: ${props => props.window.width < 400 ? '10px': '15px'};
  ${props => props.inner ? 'margin-top: 10px;' : null}
`

const StyledParagraph = styled(Paragraph)`
  margin-top: ${props => props.window.width < 400 ? '7px': '15px'};
  margin-bottom: ${props => props.window.width < 400 ? '15px': '30px'};
  color: ${colors.black};
  font-size: ${props => props.window.width < 400 ? '13': '15'};
  font-family: 'Roboto';
  align-self: flex-start;
`

const StyledInnerParagraph = styled(StyledParagraph)`
  margin-top: 0px;
  margin-bottom: 0px;
  margin-bottom: ${props => props.window.width < 400 ? '5px': '10px'};
`

const StyledSocialWrapper = styled.View`
  margin-right: 30px;
`

const StyledSocial = styled.Image`
  width: 26px;
  height: 26px;
  flex-shrink: 1;
`

const StyledImage = styled.Image`
  margin-bottom: ${props => props.window.width < 400 ? '10px': '15px'};
  align-self: center;
  flex-shrink: 1;
  height: 200;
`

const StyledFooter = styled(Paragraph)`
  font-size: 12;
  ${Platform.OS === 'android' ? "font-family: 'Roboto-Medium';" : 'font-weight: 500;' }
  color: ${colors.black};
  width: 100%;
  text-align: center;
  padding-top: ${props => props.last ? '0px' : '20px'}
  padding-bottom: ${props => props.last ? ((props.window.width < 400 ? '40px': '60px')) : '10px'}
`

/* Component */

export default class CardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableItem title="Compartir" onPress={() => navigation.navigate('Home')}>
        <StyledSocialWrapper>
          <StyledSocial source={require('../../../assets/img/share-button.png')} />
        </StyledSocialWrapper>
      </TouchableItem>
    ),
  })

  constructor(props) {
    super(props);
  }

  render() {
    const window = Dimensions.get('window');

    return (
      <StyledView 
        keyboardShouldPersistTaps="always"
        window={window}
        >
        <StyledTitle window={window}>¿Qué tarjeta es compatible?</StyledTitle>
        <StyledInnerParagraph window={window}>Sólo la Tarjeta Transporte Público que expede el CRTM (Consorcio Regional de Transportes de Madrid), para títulos de 30 días</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>Quizá en el futuro y si tiene sentido, se haga algo para la tarjeta Multi, si hay alguna API de consulta de datos disponible</StyledInnerParagraph>
        <StyledTitle window={window} inner={true}>¿Cuál es mi número de TTP?</StyledTitle>
        <StyledImageWrapper>
          <StyledImage resizeMode="contain" source={require('../../../assets/img/ttp.png')} window={window} />
        </StyledImageWrapper>
        <StyledInnerParagraph window={window}>Son los números que aparecen en la imagen. Puedes meter el número entero o sólo los números dentro de los recuadros rojos</StyledInnerParagraph>
        <StyledTitle window={window} inner={true}>¿Cómo de fiable es el servicio?</StyledTitle>
        <StyledInnerParagraph window={window}>Consultamos los datos directamente al servidor del CRTM, así que todo lo fiable que sea su servicio</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>En ocasiones éste devuelve resultados sin sentido, como fechas de expiración anteriores al día de hoy y otros misterios</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>Por suerte, se suele arreglar sólo tras un par de días, y ya devuelve la fecha correcta</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>Por desgracia, no hay mucho más que pueda hacer en el lado de la app para arreglarlo ya que depende directamente de ellos</StyledInnerParagraph>
        <StyledTitle window={window} inner={true}>¿Qué se obtiene de mi TTP?</StyledTitle>
        <StyledInnerParagraph window={window}>El número de la tarjeta, la fecha de expiración de la tarjeta y otras fechas relacionadas con el título cargado. Y de esos datos sólo se consideran el número de tarjeta y la fecha de expiración. El resto se ignora.</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>No se guarda ningún tipo de dato personal ni se sabe a quién pertenece la tarjeta</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>Tus datos siguen siendo tuyos, ya que además guardamos la información de las tarjetas sólo en tu dispositivo</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>Ésta última funcionalidad permite poder guardar el mismo número de tarjeta en múltiples dispositivos, útil para poder controlar varias tarjetas por varias personas (por ej. para familias)</StyledInnerParagraph>
        <StyledTitle window={window} inner={true}>¿Qué puedo hacer con esta app?</StyledTitle>
        <StyledInnerParagraph window={window}>Con esta aplicación puedes consultar de forma sencilla la fecha de expiración de tu TTP</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>Además puedes guardar tu tarjeta u otras tarjetas y añadir un evento directamente a tu calendario para que te avise el día que caduca tu TTP</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>De esa manera, cada vez que recargues el título podrás consultar la aplicación para crear un evento en tu calendario y que no se te olvide nunca</StyledInnerParagraph>
        <StyledTitle window={window} inner={true}>¿Por qué usar esta app y no la oficial?</StyledTitle>
        <StyledInnerParagraph window={window}>La aplicación oficial digamos que está un poco anticuada, y echaba de menos alguna funcionalidades</StyledInnerParagraph>
        <StyledInnerParagraph window={window}>Yo quería una forma sencilla de saber cuándo me caduca el título TTP y no descubrirlo al llegar al metro o al bus, y con su aplicación no me era suficiente</StyledInnerParagraph>
        {/*<StyledTitle window={window} inner={true}>¿Funcionará con NFC?</StyledTitle>
        <StyledInnerParagraph window={window}>Está planeado sí</StyledInnerParagraph>*/}
        <StyledFooter window={window}>madridttp.app@gmail.com</StyledFooter>
        <StyledFooter window={window} last={true}>Crafted with ❤️ from Madrid</StyledFooter>
      </StyledView>
    );
  }
}