var gulp = require('gulp');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var deploy = require('gulp-gh-pages');
var runSequence = require('run-sequence');

gulp.task('connect', function() {
	connect.server({
		root: './app/'
	});
});

gulp.task('clean', function () {  
  //retun makes asynchronous
  return gulp.src('build', {read: false})
    .pipe(clean());
});

//too lazy to use weird array
gulp.task('format', function() {
  return gulp.src('app/*.js')
  .pipe(ngmin())
  .pipe(gulp.dest('app'));
});

gulp.task('demo', function(){
  connect.server({
    root: './build/'
  });
});


gulp.task('copy-html-files', function() {
  gulp.src(['./app/**/*.html', '!./app/index.html'], {base: './app'})
    .pipe(gulp.dest('build/'));
});

//fuck! why only works with double quotes to asset references in index.html?
gulp.task('usemin', function() {
  gulp.src('./app/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('build/'));
});

//std in errors
gulp.task('deploy', function () {
    gulp.src('./build/**/*')
    .pipe(deploy());
});

gulp.task('default', ['connect']);

//dumps build/ then runs tasks in parallel
gulp.task('build', function() {
  runSequence('clean',
    ['copy-html-files', 'usemin']);
});