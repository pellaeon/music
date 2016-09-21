<?php
// scripts/stylesheets for different OC versions
$version = \OCP\Util::getVersion();

\OCP\Util::addScript('core', 'placeholder');
if (version_compare(implode('.', $version), '7.8', '<=')) {
	\OCP\Util::addScript('3rdparty', 'md5/md5.min');
	\OCP\Util::addScript('music', 'vendor/underscore/underscore-min');
} else {
	vendor_script('blueimp-md5/js/md5');
}

// until ownCloud 8.2 OC.Backbone was not present
if($version[0] < 8 || $version[0] === 8 && $version[1] < 2) {
	\OCP\Util::addScript('music', 'vendor/backbone/backbone-min');
	\OCP\Util::addScript('music', 'public/pre-stable8.2-fixes');
}

\OCP\Util::addScript('music', 'vendor/soundmanager/script/soundmanager2-nodebug-jsmin');
\OCP\Util::addScript('music', 'vendor/aurora/aurora');
\OCP\Util::addScript('music', 'vendor/aurora/flac');
\OCP\Util::addScript('music', 'vendor/aurora/mp3');
#\OCP\Util::addScript('music', 'public/app');
\OCP\Util::addScript('music', 'app/playerwrapper');

\OCP\Util::addStyle('music', 'app');

?>

<app></app>

<<<<<<< HEAD
<div id="app" ng-app="Music" ng-cloak ng-init="started = false; lang = '<?php p($_['lang']) ?>'">

	<script type="text/ng-template" id="overview.html">
		<?php print_unescaped($this->inc('partials/overview')) ?>
	</script>

	<div ng-controller="MainController">
		<!-- this will be used to display the flash element to give the user a chance to unblock flash -->
		<div id="sm2-container" ng-class="{started: started}"></div>
		<!--<div id="app-navigation">
			<ul ng-controller="PlaylistController">
				<li><a href="#/" translate>All</a></li>
				<li class="app-navigation-separator"><a href="#/" translate>Favorites</a></li>
				<li><a href="#/" translate>+ New Playlist</a></li>
				<li ng-repeat="playlist in playlists">
					<a href="#/playlist/{{playlist.id}}">{{playlist.name}}</a>
				</li>
			</ul>
		</div>-->

		<div id="app-content">

			<div id="controls" ng-controller="PlayerController" ng-class="{started: started}">
				<div id="play-controls">
					<img ng-click="prev()" class="control small svg" alt="{{'Previous' | translate }}"
						src="<?php p(OCP\image_path('music', 'play-previous.svg')) ?>" />
					<img ng-click="toggle()" ng-hide="playing" class="control svg" alt="{{'Play' | translate }}"
						src="<?php p(OCP\image_path('music', 'play-big.svg')) ?>" />
					<img ng-click="toggle()" ng-show="playing" class="control svg" alt="{{'Pause' | translate }}"
						src="<?php p(OCP\image_path('music', 'pause-big.svg')) ?>" />
					<img ng-click="next()" class="control small svg" alt="{{'Next' | translate }}"
						src="<?php p(OCP\image_path('music', 'play-next.svg')) ?>" />
				</div>


				<div ng-show="currentAlbum" ng-click="scrollToCurrentAlbum()"
					class="albumart clickable" cover="{{ currentAlbum.cover }}"
					albumart="{{ currentAlbum.name }}" title="{{ currentAlbum.name }}" ></div>

				<div class="song-info clickable" ng-click="scrollToCurrentAlbum()">
					<span class="title" title="{{ currentTrack.title }}">{{ currentTrack.title }}</span><br />
					<span class="artist" title="{{ currentTrack.artistName }}">{{ currentTrack.artistName }}</span>
				</div>
				<div ng-show="currentTrack.title" class="progress-info">
					<span ng-hide="loading" class="muted">{{ position.current | playTime }}/{{ position.total | playTime }}</span>
					<span ng-show="loading" class="muted">Loading...</span>
					<div class="progress">
						<div class="seek-bar" ng-click="seek($event)" ng-style="{'cursor': seekCursorType}">
							<div class="buffer-bar" ng-style="{'width': position.bufferPercent, 'cursor': seekCursorType}"></div>
							<div class="play-bar" ng-show="position.total" 
								ng-style="{'width': position.currentPercent, 'cursor': seekCursorType}"></div>
						</div>
					</div>
				</div>

				<img id="shuffle" class="control small svg" alt="{{'Shuffle' | translate }}"
					src="<?php p(OCP\image_path('music', 'shuffle.svg')) ?>" ng-class="{active: shuffle}" ng-click="shuffle=!shuffle" />
				<img id="repeat" class="control small svg" alt="{{'Repeat' | translate }}"
					src="<?php p(OCP\image_path('music', 'repeat.svg')) ?>" ng-class="{active: repeat}" ng-click="repeat=!repeat" />
				<div class="volume-control">
					<img id="volume-icon" class="control small svg" alt="{{'Volume' | translate }}" ng-show="volume > 0"
						src="<?php p(OCP\image_path('music', 'sound.svg')) ?>" />
					<img id="volume-icon" class="control small svg" alt="{{'Volume' | translate }}" ng-show="volume == 0"
						src="<?php p(OCP\image_path('music', 'sound-off.svg')) ?>" />
					<input type="range" class="volume-slider" min="0" max="100" ng-model="volume"/>
				</div>
			</div>

			<div id="app-view" ng-view ng-class="{started: started, 'icon-loading': loading}">
			</div>

			<div ng-show="artists" class="alphabet-navigation" ng-class="{started: started}" resize>
				<a scroll-to="{{ letter }}" ng-repeat="letter in letters" ng-class="{available: letterAvailable[letter], filler: ($index % 2) == 1}">
					<span class="letter-content">{{ letter }}</span>
				</a>
			</div>

		</div>

	</div>

</div>
=======
<script src="/core/capps/music/js/public/main.js"></script>
>>>>>>> Update# port koel's laravel-elixir and gulpfile here
