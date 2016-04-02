<template>
    <article class="item" v-if="album.songs.length">
        <span v-link="{name: 'album', params: { id: album.id }}" class="cover" :style="{ backgroundImage: 'url(' + album.cover + ')' }">
            <a class="control" v-link="{name: 'album', params: { id: album.id }}" @click.prevent="play">
                <i class="fa fa-play"></i>
            </a>
        </span>
        <footer>
            <p class="name"><a v-link="{name: 'album', params: { id: album.id }}">{{ album.name }}</a></p>
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
    import queueStore from '../../stores/queue';

    export default {
        props: ['album'],

        methods: {
            /**
             * Play all songs in the current album.
             */
            play() {
                playback.stop();
                queueStore.clear();
                queueStore.queue(this.album.songs, true);
                playback.playFirstInQueue();
            },
        },
    };
</script>

<style lang="sass">
    @import "../../sass/partials/_vars.scss";
    @import "../../sass/partials/_mixins.scss";
</style>
