'use strict';


/*=================+

Gulp installation:
--------------------
npm install -g gulp
npm install --save-dev gulp gulp-util

Project Dependencies:
--------------------
npm install gulp --save-dev

Simple Dependency Install:
--------------------
npm install (from the same root directory as the `package.json` file)

====================*/


var gulp = require('gulp');
var path = require('path');


//----- Automatically load all the plugins in the package.json
//----- They can be accessed using the format plugins.pluginName
var plugins = require("gulp-load-plugins")();


//----- Express server setup variables
var express = require('express');
var livereload = require('connect-livereload');
var tinylr = require('tiny-lr');
var lr = void 0;
var express_port = 8080;
var livereload_port = 35729;


var paths = {
	app  : './',
	dist : '../dist/',
    dev  : '../dev/'
};


var sources = {
    html : paths.dev + '**/*.html',
	ts : paths.dev + 'scripts/**/*.ts',
    js : [
        paths.dev + 'scripts/**/*.js',
        paths.app + '_ts_processed/**/*.js'
    ],
    js_components : [ // js scripts in bower_components directory that we want to include in dist.
        paths.app + 'bower_components/angular/angular.min.js',
        paths.app + 'bower_components/d3/d3.min.js'
    ],
    scss : paths.dev + 'styles/**/*.scss',
    css : [
        paths.dev + 'styles/**/*.css',
        paths.app + '_scss_processed/**/*.css'
    ],
    images : paths.dist + 'assets/images/*',
    watchList : paths.dist + "**/*.{js,html,css}"
};


var destinations = {
	html    : paths.dist + 'pages/',
    ts      : paths.app + '_ts_processed/', // For holding ts while we process it.
	js      : paths.dist + 'scripts/',
    js_temp : paths.app + '_js_processed/', // For holding js while we process it.
    js_components : paths.dist + 'scripts/', // Location of dist vendor scripts.
    scss    : paths.app + '_scss_processed/', // For holding scss while we process it.
	css     : paths.dist + 'styles/',
    images  : paths.dist + 'assets/images/'
};



//===== Banner to use at top of production files
var pkg = require('./package.json');
var banner = [
    '/*!\n' +
    ' * <%= pkg.name %> v<%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * Copyright <%= pkg.copyright %> Pilot Lab\n' +
    ' * <%= pkg.url %>\n' +
    ' */\n\n',
  ''].join('\n');


//===== styles
//----- Clean out the dist styles folder before we process scss.
gulp.task('stylesDev', function(event) {
	return gulp.src(sources.scss).pipe(plugins.rubySass({
		style: "expanded"
	}))
    .pipe(gulp.dest(destinations.css));
});
gulp.task('stylesDist', function(event) {
	return gulp.src(sources.scss).pipe(plugins.rubySass({
		style: "compressed"
	}))
    .pipe(plugins.header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(destinations.css));
});
 

//===== scripts
//----- Clean out the typescript output folder before we process new typescript.
gulp.task('cleanTypescriptProcessed', function() {
	return gulp.src(destinations.ts + '*', {read: false}).pipe(plugins.clean());
});
//----- Compile our typescript to javascript and hold it in an output folder for further processing.
gulp.task('typescript', ['cleanTypescriptProcessed'], function () {
    return gulp.src(sources.ts)
        .pipe(plugins.tsc({
            module: 'commonjs',
            target: 'ES5'
        }))
        .pipe(gulp.dest(destinations.ts));
});
//----- Clean out the javascript temp folder before we process new typescript.
gulp.task('cleanJavascriptProcessed', ['typescript'], function() {
	return gulp.src(destinations.js_temp + '*', {read: false}).pipe(plugins.clean());
});
gulp.task('scripts', ['cleanJavascriptProcessed'], function() {
    return gulp.src(sources.js)
        .pipe(plugins.concat('index.js'))
        .pipe(gulp.dest(destinations.js_temp))
});
gulp.task('scriptsDev', ['scripts'], function(){
    return gulp.src(destinations.js_temp + '*')
		.pipe(gulp.dest(destinations.js))
});
gulp.task('scriptsDist', ['scripts'], function(){
    return gulp.src(destinations.js_temp + '*')
        .pipe(plugins.uglify())
        .pipe(plugins.header(banner, { pkg : pkg } ))
		.pipe(gulp.dest(destinations.js))
});


//===== componentScripts
//----- Concatenate the vendor scripts we want to use and copy them to the dist folder.
gulp.task('componentScripts',  function(){
    return gulp.src(sources.js_components)
        .pipe(plugins.concat('components.min.js'))
        .pipe(gulp.dest(destinations.js_components))
});


//===== images
gulp.task('images', function(){
	return gulp.src(sources.images)
		.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest(destinations.images));
});


//===== serve
gulp.task('serve', function(event) {
	var app = express();
	app.use(livereload());
	app.use(express['static'](paths.dist));
	app.listen(express_port);
	lr = tinylr();
	lr.listen(livereload_port);
});


//----- Refresh the browser when changes are detected in the dist directory.
//----- NOTE: This requires the livereload browser extension.
//----- https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
var refresh = function(event) {
	var fileName = path.relative(paths.dist, event.path);
	plugins.util.log.apply(plugins.util, [plugins.util.colors.magenta(fileName), plugins.util.colors.cyan('changed')]);
	return lr.changed({
		body: {
			files: [fileName]
		}
	});
};


//===== openChrome
gulp.task('openChrome', function() {
  var options = {
    url: 'http://localhost:' + express_port,
    app: 'google chrome'
  };
  gulp.src(path.resolve(paths.dist + 'index.html')).pipe(plugins.open('', options));
});


//===== openFirefox
gulp.task('openFirefox', function() {
  var options = {
    url: 'http://localhost:' + express_port,
    app: 'firefox'
  };
  gulp.src(path.resolve(paths.dist + 'index.html')).pipe(plugins.open('', options));
});


//===== openSafari
gulp.task('openSafari', function() {
  var options = {
    url: 'http://localhost:' + express_port,
    app: 'safari'
  };
  gulp.src(path.resolve(paths.dist + 'index.html')).pipe(plugins.open('', options));
});


//===== watch
gulp.task('watch', function() {
	gulp.watch(sources.ts, ['scriptsDev']);
    gulp.watch(sources.js, ['scriptsDev']);
	gulp.watch(sources.scss, ['stylesDev']);
	gulp.watch(sources.images, ['images']);
	gulp.watch(sources.watchList, refresh);
});


//===== default
gulp.task('default', ['serve', 'openChrome', 'watch']);


//===== buildDev
gulp.task('buildDev', ['componentScripts', 'scriptsDev', 'stylesDev']);


//===== buildDist
gulp.task('buildDist', ['componentScripts', 'scriptsDist', 'stylesDist', 'images']);


