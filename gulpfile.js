var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

// Less plugins
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new LessAutoprefix({
	browsers: ['last 2 versions']
});

// File paths
// Some file change
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css';


// Styles For SCSS
gulp.task('pluginstyles', function () {
    console.log('starting plugin styles task');
    return gulp.src('public/scss/plugin.scss')
        .pipe(plumber(function (err) {
            console.log('Styles Task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CSS_PATH))
});

// Styles For SCSS
gulp.task('styles', function () {
	console.log('starting styles task');
	return gulp.src(['public/scss/styles.scss'])
		.pipe(plumber(function (err) {
			console.log('Styles Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(CSS_PATH))
		.pipe(livereload());
});


// Scripts
gulp.task('pluginscripts', function () {
    console.log('starting plugin scripts task');

    return gulp.src([
    	'node_modules/jquery/dist/jquery.js',
    	'node_modules/tether/dist/js/tether.js',
    	'node_modules/bootstrap/dist/js/bootstrap.js'
	])
        .pipe(plumber(function (err) {
            console.log('Scripts Task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('pluginscripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
});

// Scripts
gulp.task('scripts', function () {
	console.log('starting scripts task');

	return gulp.src(SCRIPTS_PATH)
		.pipe(plumber(function (err) {
			console.log('Scripts Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

gulp.task('html_watch', function(){
	console.log('Starting html file watch');
	gulp.src('public/**/*.html')
		.pipe(livereload());
});

// Images
gulp.task('images', function () {
	console.log('starting images task');
});

gulp.task('default', function () {
	console.log('Starting default task');
});

gulp.task('watch', function () {
	console.log('Starting watch task');
	require('./server.js');
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch('public/scss/styles.scss', ['styles']);
	gulp.watch('public/**/*.html',['html_watch']);
	livereload.listen();

});
