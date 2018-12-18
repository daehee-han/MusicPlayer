import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const AlbumArt = ({url, onPress}) => (
  <View style = {{alignItems: 'center', marginVertical : 24}}>
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.AlbumImage} source={{uri: url}} />
    </TouchableOpacity>
  </View>
);

export default AlbumArt;

const styles = StyleSheet.create({
  AlbumImage: {
    width: imageSize,
    height: imageSize,
    borderColor : '#D3D3D3', 
    borderWidth : 2,
  },
});
