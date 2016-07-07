'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var pagespeed = require('psi');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var pump = require('pump');

// Lint JavaScript
gulp.task('jshint', function() {
  return gulp.src(['*.js', '!gulpfile.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function() {
  return gulp.src([
    '**/*.gabc',
    'fallback/*.js',
    '!dist/**/*',
    '!node_modules/**/*'
  ], {
    dot: true,
    base: '.'
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function() {

  return gulp.src([
    '*.css'
  ])
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'styles'}));
});

// Concatenate And Minify JavaScript
gulp.task('scripts', function(cb) {
  var sources = [
    '*.js',
    '!gulpfile.js'
  ];

  pump([
        gulp.src(sources, {base: '.'}),
        $.uglify(),
        gulp.dest('dist'),
        $.size({title: 'scripts'})
    ],
    cb
  );
});

gulp.task('exsurge', function(cb) {
  pump([
        gulp.src('fallback/exsurge.js', {base: '.'}),
        $.uglify({mangle: false}),
        gulp.dest('dist'),
        $.size({title: 'exsurge'})
    ],
    cb
  );
})

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function() {
  
  return gulp.src(['*.html', 'psalms/**/*.html'], {base: '.'})
    // Replace ǽ with æ, since the font we are using right now doesn't look right with the ǽ character,
    // even when trying to use combining diacritics æ\x0301
    .pipe(replace('ǽ','æ'))
    // Minify Any HTML
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default']);

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function(cb) {
  runSequence('copy', ['html', 'styles', 'scripts', 'exsurge'], cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
  // By default, we use the PageSpeed Insights
  // free (no API key) tier. You can use a Google
  // Developer API key if you have one. See
  // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
  url: 'https://compline.us.to',
  strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }