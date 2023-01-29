import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Colors} from '../../colors';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export const Background = styled.View`
  background-color: ${Colors.backgroundOnboarding};
  width: ${Width}px;
  height: ${Height}px;
`;

export const Button = styled.TouchableHighlight`
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin-bottom: 16px;
  background-color: ${Colors.awardButton};
`;

export const Register = styled.TouchableHighlight`
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin-bottom: 16px;
  border: 1px dashed ${Colors.lightingBlue};
`;

export const Title = styled.Text`
  color: ${Colors.white};
  font-weight: 600;
  font-size: 24px;
`;

export const Description = styled.Text`
  color: ${Colors.white};
  font-weight: normal;
  font-size: 16px;
`;

export const inputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  height: 48px;
  padding-left: 5px;
  color: white;
  border-bottom-width: 1px;
  border-bottom-color: white;
`;
