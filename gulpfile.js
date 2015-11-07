var fs = require('fs');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var path = require('path');
var flatten = require('gulp-flatten');
var fileinclude = require('gulp-file-include');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var runSequence = require('run-sequence');

var paths = {
  componentJS:'client/components/**/*.js',
  componentStyles:'client/components/**/*.less',
  componentHTML:'client/components/**/*.html',
  pluginHTML:'client/plugins/**/*.html',
  pluginStyles:'client/plugins/**/*.less',
  pluginJS:'client/plugins/**/*.js',
  homeStyles:'client/*.less',
  homeHTML:'client/*.html',
  homeJS:'client/*.js',
  resourcesCSS:'client/resources/**/*.css',
  resourcesJS:'client/resources/**/*.js'
};

var nameFromPath = function(path){
  return path.split('.')[0].
  split('/').slice(-1)[0].
  split('\\').slice(-1)[0];
};

gulp.task('plugins', function(){
  return gulp.src(paths.pluginJS).
  pipe(insert.transform(function(contents, file){
    var name = nameFromPath(file.path);
    return 'Ractive.plugins.'+ name + ' = $(function($, Ractive){' + contents + '})(jQuery, Ractive);\n'+
      'Ractive.components.plugin' + name + ' = Ractive.plugins.' + name + ';\n';
  })).
  pipe(concat('plugins.js')).
  pipe(gulp.dest('./build'));
});

gulp.task('resourcesJS', function(){
  return gulp.src([paths.resourcesJS]).
  pipe(concat('resources.js')).
  pipe(gulp.dest('./build'));
});

gulp.task('mainJS', function(){
  return gulp.src(['client/app.js', paths.componentJS]).
  pipe(insert.append('\n')).
  pipe(concat('app.js')).
  pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  })).
  pipe(gulp.dest('./build'));
});

gulp.task('html', function(callback){
  runSequence('components',
              'homeHTML',
              callback);
});

gulp.task('homeHTML', function(){
  return gulp.src('client/index.html').
  pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  })).
  pipe(gulp.dest('./build'));
});

gulp.task('components', function() {
  return gulp.src([paths.componentHTML, paths.pluginHTML]).
  pipe(insert.transform(function(contents, file) {
    return '<script type="text/html" id="'+
      nameFromPath(file.path) +
      '">' +
      contents +
      '</script>\n';
  })).
  pipe(concat('components.html')).
  pipe(gulp.dest('./build'));
});

gulp.task('scripts', function(callback) {
  runSequence('resources',
              'plugins',
              'mainJS',
              callback);
});

gulp.task('less', function () {
  return gulp.src([paths.homeStyles, paths.pluginStyles, paths.componentStyles, paths.resources]).
  pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  })).
  pipe(concat("site.css")).
  pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch([paths.pluginJS, paths.componentJS, paths.homeJS], ['scripts']);
  gulp.watch([paths.componentStyles, paths.pluginStyles, paths.homeStyles], ['less']);
  gulp.watch('client/resources/**/*.js', ['resourcesJS'])
  gulp.watch('client/**/*.html', ['html']);
});

gulp.task('default', ['watch', 'scripts', 'less', 'html']);
