import _ from 'lodash';

import ls from '../services/ls';

export default {
    storeKey: '',

    state: {
        volume: 7,
        notify: true,
        repeatMode: 'NO_REPEAT',
        showExtraPanel: true,
    },

    /**
     * Init the store.
     */
    init() {
        this.storeKey = `preferences`;
        _.extend(this.state, ls.get(this.storeKey, this.state));
    },

    set(key, val) {
        this.state[key] = val;
        this.save();
    },

    get(key) {
        return _.has(this.state, key) ? this.state[key] : null;
    },

    save() {
        ls.set(this.storeKey, this.state);
    },
};
