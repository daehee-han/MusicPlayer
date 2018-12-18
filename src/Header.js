import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

const Header = ({message}) => (
  <View style={styles.HeaderView}>
    <TouchableOpacity>
      <Image source={require('../images/pageback_Button.png')} style={styles.HeaderButton}/>
    </TouchableOpacity>
    <Text style={styles.HeaderFont}>{message}</Text>
    <TouchableOpacity>
      <Image source={require('../images/playlist_Button.png')} style={styles.HeaderButton}/> 
    </TouchableOpacity>
  </View>
); //리스트버튼으로 수정바람

export default Header;

const styles = StyleSheet.create({
  HeaderView: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    paddingHorizontal: 10,
  },
  HeaderFont: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
//    fontWeight: 'bold',
  },
  HeaderButton: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
