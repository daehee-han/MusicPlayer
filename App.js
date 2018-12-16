import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View, Dimensions} from 'react-native';
//import Sound from 'react-native-sound';
import Slider from 'react-native-slider';

const Header = ({message}) => (
  <View style={styles.HeaderView}>
    <TouchableOpacity>
      <Image source={require('./images/pageback_Button.png')} style={styles.HeaderButton}/>
    </TouchableOpacity>
    <Text style={styles.HeaderFont}>{message}</Text>
    <TouchableOpacity>
      <Image source={require('./images/playlist_Button.png')} style={styles.HeaderButton}/> 
    </TouchableOpacity>
  </View>
); //리스트버튼으로 수정바람

const AlbumArt = ({url, onPress}) => (
  <View style = {{alignItems: 'center', marginVertical : 24}}>
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.AlbumImage} source={{uri: url}} />
    </TouchableOpacity>
  </View>
);

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const TrackInfo = ({title, artist, onLikePress, onSettingPress}) => (
  <View style={{flexDirection : 'row', alignItems: 'center', paddingHorizontal: 20}}>
    <TouchableOpacity onPress={onLikePress}>
      <Image style={styles.HeaderButton}
        source={require('./images/like_Button_Blanked.png')} />
    </TouchableOpacity>
    <View style={styles.InfoWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
    <TouchableOpacity onPress={onSettingPress}>
      <View style={styles.moreButton}>
        <Image style={styles.HeaderButton}
          source={require('./images/setting_Button.png')} />
      </View>
    </TouchableOpacity>
  </View>
);

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
        style={styles.slider}
        minimumTrackTintColor='#fff'
        maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
        thumbStyle={styles.thumb}
        trackStyle={styles.track}/>
    </View>
  );
};


const Controls = ({paused, shuffleOn, repeatOn, onPressPlay, onPressPause, onBack, onForward, onPressShuffle, onPressRepeat, forwardDisabled}) => (
  <View style={{flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D3D3D3', paddingHorizontal: 20, height: height / 9}}>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
      <Image style={[{width: 35, resizeMode: 'contain'} || styles.secondaryControl, shuffleOn ? [] : styles.off]}
        source={require('./images/shuffle_Button.png')}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={onBack}>
      <Image style={{width: 50, resizeMode: 'contain'}} source={require('./images/back_Button.png')}/>
    </TouchableOpacity>
    {!paused ?
      <TouchableOpacity onPress={onPressPause}>
        <View>
          <Image style={styles.PlayButton} source={require('./images/pause_Button.png')}/>
        </View>
      </TouchableOpacity> :
      <TouchableOpacity onPress={onPressPlay}>
        <View>
          <Image style={styles.PlayButton} source={require('./images/play_Button.png')}/>
        </View>
      </TouchableOpacity>
    }
    <TouchableOpacity onPress={onForward}
      disabled={forwardDisabled}>
      <Image style={[forwardDisabled && {opacity: 0.3} || {width: 50, resizeMode: 'contain'}]}
        source={require('./images/forward_Button.png')}/>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Image style={[{width: 35, resizeMode: 'contain'} || styles.secondaryControl, repeatOn ? [] : styles.off]}
        source={require('./images/repeat_Button.png')}/>
    </TouchableOpacity>
  </View>
);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header message="My Music Player"/>
        <AlbumArt url="http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg" />
        <TrackInfo title="Stressed Out" artist="Twenty One Pilots"/>
        <SeekBar trackLength={204} currentPosition={156} />
        <Controls />
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

  AlbumImage: {
    width: imageSize,
    height: imageSize,
    borderColor : '#D3D3D3', 
    borderWidth : 2,
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

  PlayButton: {
    height: 70,
    resizeMode: 'contain',
  },
});
