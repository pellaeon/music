<template>
    <article v-if="song" id="artistInfo">
        <h1>
            <span>{{ song ? song.album.artist.name : '' }}</span>
            
            <a class="shuffle" @click.prevent="shuffleAll"><i class="fa fa-random"></i></a>
        </h1>

        <div v-if="song.album.artist.info">
            <img v-if="song.album.artist.info.image" :src="song.album.artist.info.image" 
                title="They see me posin, they hatin"
                class="cool-guys-posing cover">

            <div class="bio" v-if="song.album.artist.info.bio.summary">
                <div class="summary" v-show="!showingFullBio">{{{ song.album.artist.info.bio.summary }}}</div>
                <div class="full" v-show="showingFullBio">{{{ song.album.artist.info.bio.full }}}</div>

                <button class="more" v-show="!showingFullBio" @click.prevent="showingFullBio = !showingFullBio">
                    Full Bio
                </button>
            </div>
            <p class="none" v-else>This artist has no Last.fm biography – yet.</p>

            <footer>Data &copy; <a target="_blank" href="{{{ song.album.artist.info.url }}}">Last.fm</a></footer>
        </div>

        <p class="none" v-else>Nothing can be found. This artist is a mystery.</p>
    </article>
</template>

<script>
    import playback from '../../../services/playback';

    export default {
        replace: false,

        data() {
            return {
                song: null,
                showingFullBio: false,
            };
        },

        methods: {
            resetState() {
                this.song = null;
                this.showingFullBio = false;
            },

            shuffleAll() {
                playback.playAllByArtist(this.song.album.artist);
            },
        },

        events: {
            'song:info-loaded': function (song) {
                this.song = song;
            },
        },
    }
</script>

<style lang="sass">
    @import "../../sass/partials/_vars.scss";
    @import "../../sass/partials/_mixins.scss";

    #artistInfo {
        img.cool-guys-posing {
            width: 100%;
            height: auto;
        }

        .bio {
            margin-top: 16px;
        }
    }
</style>
