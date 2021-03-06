import _ from 'lodash';

import http from '../services/http';
import utils from '../services/utils';

export default {
    state: {
        songs: [],
    },
    
    all() {
        return this.state.songs;
    },

    /**
     * Toggle like/unlike a song. 
     * A request to the server will be made.
     *
     * @param {Object}        The song object
     * @param {Function}  The function to execute afterwards
     */
    toggleOne(song, cb = null) {
        // Don't wait for the HTTP response to update the status, just toggle right away.
        // This may cause a minor problem if the request fails somehow, but do we care?
        song.liked = !song.liked;

        if (song.liked) {
            this.add(song);
        } else {
            this.remove(song);
        }

        http.post('interaction/like', { id: song.id }, data => {
            if (cb) {
                cb();
            }
        });
    },

    /**
     * Add a song into the store.
     *
     * @param {Object} The song object
     */
    add(song) {
        this.state.songs.push(song);
    },

    /**
     * Remove a song from the store.
     *
     * @param {Object} The song object
     */
    remove(song) {
        this.state.songs = _.difference(this.state.songs, [song]);
    },

    /**
     * Like a bunch of songs.
     * 
     * @param  {Array} An array of songs to like
     */
    like(songs, cb = null) {
        // Don't wait for the HTTP response to update the status, just set them to Liked right away.
        // This may cause a minor problem if the request fails somehow, but do we care?
        _.each(songs, song => song.liked = true);
        this.state.songs = _.union(this.state.songs, songs);

        http.post('interaction/batch/like', { ids: _.pluck(songs, 'id') }, data => {
            if (cb) {
                cb();
            }
        });
    },

    /**
     * Unlike a bunch of songs.
     * 
     * @param  {Array} An array of songs to unlike
     */
    unlike(songs, cb = null) {
        // Don't wait for the HTTP response to update the status, just set them to Unliked right away.
        // This may cause a minor problem if the request fails somehow, but do we care?
        _.each(songs, song => song.liked = false);
        this.state.songs = _.difference(this.state.songs, songs);

        http.post('interaction/batch/unlike', { ids: _.pluck(songs, 'id') }, data => {
            if (cb) {
                cb();
            }
        });
    },
};
