import React from 'react';
import {Dimensions, Image, ImageSourcePropType, View} from 'react-native';
import { Colors } from '../../colors';

import * as styled from './styled';

const WIDTH = Dimensions.get('window').width;

interface SlideProps {
  title: string;
  bolded?: string;
  description: string;
  image?: ImageSourcePropType;
  children?: React.ReactNode;
  background?: string,
}

export default function Slide({
  title,
  bolded,
  description,
  image,
  children,
  background
}: SlideProps) {
  return (
    <styled.background style={{backgroundColor: background ? background : Colors.white}}>
      <View style={{marginTop: 0, alignItems: 'center'}}>
        <styled.Title style={{color: background ? Colors.white : Colors.title}}>
          {title}{' '}
          <styled.Title style={{fontFamily: 'Ubuntu_700Bold', color: background ? Colors.white : Colors.title}}>{bolded}</styled.Title>
        </styled.Title>
        <styled.Description style={{color: background ? Colors.white : Colors.title}}>{description}</styled.Description>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
          {image ? (
            <Image
              style={{width: WIDTH - 30, height: WIDTH - 20}}
              source={image}
              resizeMode={'contain'}
            />
          ) : null}
      </View>

      {children}
    </styled.background>
  );
}
