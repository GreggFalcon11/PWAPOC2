import VideoDetail from './components/video_detail';
import NavBar from './components/nav_bar';
import { Router, browserHistory, Route, Link } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import _ from 'lodash';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
const API_KEY = 'AIzaSyBAIAYHZhkWsT41drTglocgclNgha3iMqo';

//import logo from './logo.svg';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      videos: [],
      selectedVideo: null
    };
    //this.videoSearch('');

  }
  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }


  render(){
    const videoSearch =_.debounce((term) => {this.videoSearch(term) }, 300);

    return(
      <div className='main'>
        <div className = 'main-top'>
          <NavBar />
          <SearchBar onSearchTermChange = {videoSearch}/>
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
registerServiceWorker();
