import { assign } from 'lodash';
import isMobile from 'ismobilejs';

import { http } from '../services';
import { preferenceStore, artistStore, songStore, playlistStore, queueStore, settingStore } from '.';

export const sharedStore = {
  state: {
    songs: [],
    albums: [],
    artists: [],
    favorites: [],
    queued: [],
    interactions: [],
    settings: [],
    playlists: [],
    useLastfm: false,
    useYouTube: false,
    allowDownload: false,
    currentVersion: '',
    latestVersion: '',
    cdnUrl: '',
    originalMediaPath: '',
  },

  init() {
    this.reset();

    return new Promise((resolve, reject) => {
      http.get('collection', data => {
        // Don't allow downloading on mobile devices
        data.allowDownload = data.allowDownload && !isMobile.any;

        assign(this.state, data);

        // Always disable YouTube integration on mobile.
        this.state.useYouTube = this.state.useYouTube && !isMobile.phone;

        artistStore.init(this.state.artists); // This will init album and song stores as well.
        songStore.initInteractions(this.state.interactions);
        playlistStore.init(this.state.playlists);
        queueStore.init();

        // Keep a copy of the media path. We'll need this to properly warn the user later.
        this.state.originalMediaPath = this.state.settings.media_path;

        resolve(data)
      }, r => reject(r));
    });
  },

  reset() {
    this.state.songs = [];
    this.state.albums = [];
    this.state.artists = [];
    this.state.favorites = [];
    this.state.queued = [];
    this.state.interactions = [];
    this.state.users = [];
    this.state.settings = [];
    this.state.currentUser = null;
    this.state.playlists = [];
    this.state.useLastfm = false;
    this.state.allowDownload = false;
    this.state.currentVersion = '';
    this.state.latestVersion = '';
    this.state.cdnUrl = '';
  },
};
