import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View, Dimensions} from 'react-native';
import Player from './src/Player'

export const TRACKS = [
  {
    title: 'Lemonade',
    artist: 'Jeremy Passion',
    albumArtUrl: "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/881/738/80881738_1476255160695_1_600x600.JPG",
    audioUrl: require('./music/lemonade.mp3'),
  },
  {
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    audioUrl: 'http://oranslectio.files.wordpress.com/2013/12/39-15-mozart_-adagio-fugue-in-c-minor-k-546.mp3',
  },
  {
    title: 'Hotline Bling',
    artist: 'Drake',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
  },
  {
  title: 'Janet',
  artist: 'Berhana',
  albumArtUrl: 'https://images.genius.com/77812beb5db4ced6d941893762da250e.1000x1000x1.jpg',
  audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
  },
  {
  title: '안되나요',
  artist: '휘성',
  albumArtUrl: 'https://i.ytimg.com/vi/WCQF8Ol3-zI/hqdefault.jpg',
  audioUrl: 'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
  },
];

export default class App extends Component {
  render() {
    return <Player tracks={TRACKS} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f60',
  },
});
