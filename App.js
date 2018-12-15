/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
//import Sound from 'react-native-sound';

const Header = ({message}) => (
  <View style={styles.HeaderView}>
    <TouchableOpacity>
      <Image source={require('./images/back_Button.png')} style={styles.HeaderButton}/>
    </TouchableOpacity>
    <Text style={styles.HeaderFont}>{message}</Text>
    <TouchableOpacity>
      <Image source={require('./images/setting_Button.png')} style={styles.HeaderButton}/>
    </TouchableOpacity>
  </View>
);

const Playback_Controller = (
  <View style={styles.HeaderView}>
    <TouchableOpacity>
      <Image source={require('./images/play_Button.png')} style={styles.HeaderButton}/>
    </TouchableOpacity>
  </View>
);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header message="My Music Player"/>
        <View>
          <Text style={{fontSize: 15}}>summery</Text>
        </View>      
        <Playback_Controller/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
    backgroundColor: '#13133a',
  },
  HeaderView: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    padding: 10,
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

  PB_ControllerView: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    padding: 10,
  },

  PlayButton: {

  },

  

});
