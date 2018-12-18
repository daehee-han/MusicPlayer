import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const Controls = ({paused, shuffleOn, repeatOn, onPressPlay, onPressPause, onBack, onForward, onPressShuffle, onPressRepeat, forwardDisabled}) => (
  <View style={{flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D3D3D3', paddingHorizontal: 20, height: height / 8}}>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
      <Image style={[{width: 35, resizeMode: 'contain'} || styles.secondaryControl, shuffleOn ? [] : styles.off]}
        source={require('../images/shuffle_Button.png')}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={onBack}>
      <Image style={{width: 50, resizeMode: 'contain'}} source={require('../images/back_Button.png')}/>
    </TouchableOpacity>
    {!paused ?
      <TouchableOpacity onPress={onPressPause}>
        <View>
          <Image style={styles.PlayButton} source={require('../images/pause_Button.png')}/>
        </View>
      </TouchableOpacity> :
      <TouchableOpacity onPress={onPressPlay}>
        <View>
          <Image style={styles.PlayButton} source={require('../images/play_Button.png')}/>
        </View>
      </TouchableOpacity>
    }
    <TouchableOpacity onPress={onForward}
      disabled={forwardDisabled}>
      <Image style={[forwardDisabled && {opacity: 0.3} || {width: 50, resizeMode: 'contain'}]}
        source={require('../images/forward_Button.png')}/>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Image style={[{width: 35, resizeMode: 'contain'} || styles.secondaryControl, repeatOn ? [] : styles.off]}
        source={require('../images/repeat_Button.png')}/>
    </TouchableOpacity>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  PlayButton: {
    height: 75,
    resizeMode: 'contain',
  },
});
