import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

const TrackInfo = ({title, artist, onLikePress, onSettingPress}) => (
  <View style={{flexDirection : 'row', alignItems: 'center', paddingHorizontal: 20}}>
    <TouchableOpacity onPress={onLikePress}>
      <Image style={styles.Button}
        source={require('../images/like_Button_Blanked.png')} />
    </TouchableOpacity>
    <View style={styles.InfoWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
    <TouchableOpacity onPress={onSettingPress}>
      <View style={styles.moreButton}>
        <Image style={styles.Button}
          source={require('../images/setting_Button.png')} />
      </View>
    </TouchableOpacity>
  </View>
);

export default TrackInfo;

const styles = StyleSheet.create({
  Button: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  InfoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    marginTop: 4,
  },
});
