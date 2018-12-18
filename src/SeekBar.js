import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from 'react-native-slider';

function pad(n, width, z=0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);


const SeekBar = ({trackLength, currentPosition, onSeek, onSlidingStart}) => {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={{flex: 1, paddingHorizontal: 20, marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.Slidetext}>
          {elapsed[0] + ":" + elapsed[1]}
        </Text>
        <View style={{flex: 1}} />
        <Text style={[styles.Slidetext, {width: 40}]}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        minimumTrackTintColor='#fff'
        maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
        thumbStyle={styles.thumb}
        trackStyle={styles.track}/>
    </View>
  );
};


export default SeekBar;

const styles = StyleSheet.create({
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },

  Slidetext: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign:'center',
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
});
