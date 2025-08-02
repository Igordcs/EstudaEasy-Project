import styled from 'styled-components/native';
import {Dimensions, Platform} from 'react-native';
import {Colors} from '../../colors';
import { fonts } from '../../fonts';

const Width = Dimensions.get('window').width;

export const background = styled.View`
  background-color: ${Colors.white};
  padding-left: 32px;
  padding-right: 32px;
  padding-top: ${Platform.OS === 'ios' ? 96 : 48}px;
  width: ${Width}px;
`;

export const Header = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Title = styled.Text`
  text-align: center;
  color: ${Colors.title};
  ${fonts.onboardingTitle}
`;

export const Description = styled.Text`
  color: ${Colors.title};
  ${fonts.onboardingDescription}
  margin: 8px 0;
  width: ${Width-32}px;
  text-align: center;
`;

export const Footer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 4px;
  padding-right: 4px;
  margin-bottom: 32px;
`;
