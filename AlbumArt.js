import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

const AlbumArt = ({url, onPress}) => (
  <View style = {{alignItems: 'center', marginVertical : 24}}>
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.AlbumImage} source={{uri: url}} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  AlbumImage: {
    width: imageSize,
    height: imageSize,
    borderColor : '#D3D3D3', 
    borderWidth : 2,
  },
});
