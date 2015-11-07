var gulp = require('gulp');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var runSequence = require('run-sequence');
var insert = require('gulp-insert');


var paths = {
  'componentJS':'client/components/**/*.js',
  'componentHTML':'client/components/**/*.html',
  'css':'client/**/*.css',
  'siteJS':'client/*.js',
  'siteCSS':'client/*.css',
  'siteHTML':'client/*.html'
};

gulp.task('scripts', function(callback){
  runSequence('componentJS', 'siteJS', callback)
});

gulp.task('siteJS', function(){
  return gulp.src(paths.siteJS).
  pipe(fileinclude({
    prefix: '@@',
    basepath: './build'
  })).pipe(gulp.dest('./build'));
});

gulp.task('componentJS', function(){
  return gulp.src(paths.componentJS).pipe(concat('components.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('componentHTML', function(){
  return gulp.src(paths.componentHTML).pipe(
    insert.transform(function(contents, file) {
      return '<script type="text/ractive" id="' + file.path.split('/').slice(-1)[0].split('.')[0] + '">' + contents + '</script>';
    })).pipe(concat('components.html'))
  .pipe(gulp.dest('./build'));
});

gulp.task('pageHTML', function(cb){
  runSequence('componentHTML', 'index', cb);
})

gulp.task('siteHTML', function(){
  return gulp.src(paths.siteHTML).pipe(fileinclude({
    prefix: '@@',
    basepath: './build'
  })).pipe(gulp.dest('./build'));
});


gulp.task('watch', function(){
  gulp.watch([paths.componentJS, paths.componentHTML], ['scripts', 'pageHTML']);
  gulp.watch([paths.siteJS, paths.componentJS], ['scripts']);
  gulp.watch([paths.siteHTML], ['siteHTML']);
});

gulp.task('default', function() {
  // place code for your default task here
});
