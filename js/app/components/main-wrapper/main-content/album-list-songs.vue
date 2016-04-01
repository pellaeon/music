<template>
    <div id="albumSongsWrapper">
        <h1 class="heading" v-show="album">
            <span>{{ album.name }}
                <i class="fa fa-chevron-down toggler"
                    v-show="isPhone && !showingControls"
                    @click="showingControls = true"></i>
                <i class="fa fa-chevron-up toggler"
                    v-show="isPhone && showingControls"
                    @click.prevent="showingControls = false"></i>
            </span>
        </h1>
        <h1 class="heading" v-else><span>Album does not exist</span></h1><!-- FIXME currentAlbum will never be null so this won't happen-->

        <song-list :items="playState.currentAlbum.songs" :selected-songs.sync="selectedSongs" type="queue"></song-list>
    </div>
</template>

<script>
    import isMobile from 'ismobilejs';

    import albumItem from '../../shared/album-item.vue';
    import infiniteScroll from '../../../mixins/infinite-scroll';
    import albumStore from '../../../stores/album';
    import albumStub from '../../../stubs/album';

    import playback from '../../../services/playback';
    import shuffleSelectedMixin from '../../../mixins/shuffle-selected';
    import songList from '../../shared/song-list.vue';

    export default {
        mixins: [infiniteScroll, shuffleSelectedMixin],
        components: { albumItem, songList },
        route: {
            data: function(transition) {
                var newCurrentAlb = albumStore.byId(parseInt(transition.to.params.id));
                if ( newCurrentAlb != null ) {
                    this.playState.currentAlbum = newCurrentAlb;
                } else {
                    console.log('WARNING: album not found');
                }
            }
        },

        data() {
            return {
                perPage: 9,
                numOfItems: 9,
                q: '',
                isPhone: isMobile.phone,
                showingControls: false,
                playState: playback.state,
            };
        },

        computed: {
            album() {
                return this.playState.currentAlbum;
            },
        },

        events: {
            /**
             * When the application is ready, load the first batch of items.
             */
            'koel:ready': function () {
                // if the initial load url is /#!/album/<id> , there would be no transition,
                // we need to set currentAlbum manually
                var newCurrentAlb = albumStore.byId(parseInt(this.$route.params.id));
                if ( newCurrentAlb != null ) {
                    this.playState.currentAlbum = newCurrentAlb;
                } else {
                    console.log('WARNING: album not found');
                }
            },
        },
    };
</script>

<style lang="sass">
    @import "../../sass/partials/_vars.scss";
    @import "../../sass/partials/_mixins.scss";

    #albumsWrapper {
        .albums {
            @include artist-album-card();
        }
    }
</style>
