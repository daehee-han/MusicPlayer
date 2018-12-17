import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View, Dimensions} from 'react-native';
import Slider from 'react-native-slider';
import Video from 'react-native-video';

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
  <View style={{flexDirection : 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D3D3D3', paddingHorizontal: 20, height: height / 8}}>
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

export const TRACKS = [
  {
    title: 'Lemonade',
    artist: 'Jeremy Passion',
    albumArtUrl: "https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/881/738/80881738_1476255160695_1_600x600.JPG",
    audioUrl: require('./music/lemonade.mp4'),
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
];

export default class App extends Component {
  render() {
    return <Player tracks={TRACKS} />
  }
}

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
    };
  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1,
      }), 0);
    }
  }


  render() {
    const track = this.props.tracks[this.state.selectedTrack];
    const video = this.state.isChanging ? null : (
      <Video source={track.audioUrl} // Can be a URL or a local file.
        ref="audioElement"
        paused={this.state.paused}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );
    
    return (
      <View style={styles.container}>
        <Header message="My Music Player" />
        <AlbumArt url={track.albumArtUrl} />
        <TrackInfo title={track.title} artist={track.artist} />
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({paused: true})}
          currentPosition={this.state.currentPosition} />
        <Controls
          onPressRepeat={() => this.setState({repeatOn: !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack == this.props.tracks.length - 1}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.setState({paused: false})}
          onPressPause={() => this.setState({paused: true})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        {video}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
    backgroundColor: '#1f1f60',
  },
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
    height: 75,
    resizeMode: 'contain',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
});
