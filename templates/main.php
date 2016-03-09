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
\OCP\Util::addStyle('music', 'vendor');

?>
<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100&subset=latin,latin-ext,vietnamese,greek-ext,greek,cyrillic,cyrillic-ext" rel="stylesheet">

<app></app>

<script src="<?php echo $_['mainjs']; ?>"></script>
