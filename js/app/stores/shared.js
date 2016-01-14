import { assign } from 'lodash';

import http from '../services/http';
import userStore from './user';
import preferenceStore from './preference';
import artistStore from './artist';
import songStore from './song';
import playlistStore from './playlist';
import queueStore from './queue';
import settingStore from './setting';

export default {
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
        currentVersion: '',
        latestVersion: '',
    },

    init(cb = null) {
        http.get('collection', data => {
            assign(this.state, data);

            artistStore.init(this.state.artists); // This will init album and song stores as well.
            songStore.initInteractions(this.state.interactions);
            playlistStore.init(this.state.playlists);
            queueStore.init();

            window.useLastfm = this.state.useLastfm = data.useLastfm;

            if (cb) {
                cb();
            }
        });
    },
};
