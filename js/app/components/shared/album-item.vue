<template>
    <article class="item" v-if="album.songs.length">
        <span class="cover" :style="{ backgroundImage: 'url(' + album.cover + ')' }">
            <a class="control" @click.prevent="play">
                <i class="fa fa-play"></i>
            </a>
        </span>
        <footer>
            <p class="name">{{ album.name }}</p>
            <p class="artist">{{ album.artist.name }}</p>
            <p class="meta">
                {{ album.songs.length }} song{{ album.songs.length == 1 ? '' : 's' }} 
                – 
                {{ album.fmtLength }}
            </p>
        </footer>
    </article>
</template>

<script>
    import playback from '../../services/playback';

    export default {
        props: ['album'],

        methods: {
            /**
             * Play all songs in the current album.
             */
            play() {
                playback.playAllInAlbum(this.album);
            },
        },
    };
</script>

<style lang="sass">
    @import "../../sass/partials/_vars.scss";
    @import "../../sass/partials/_mixins.scss";
</style>
