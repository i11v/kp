var gulp = require('gulp')
  , less = require('gulp-less')
  , csso = require('gulp-csso')
  , prefixer = require('gulp-autoprefixer')
  , browserify = require('gulp-browserify')
  , uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('less', function () {
  return gulp.src('./styles/app.less')
    .pipe(less())
      .on('error', console.error.bind(console))
    .pipe(prefixer([
      'Chrome >= 34',
      'Firefox >= 28',
      'Explorer >= 8']))
    .pipe(csso())
    .pipe(gulp.dest('./styles'));
});

gulp.task('js', function () {
  return gulp.src('./js/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(uglify())
    .pipe('./js/main.js')
});

gulp.task('default', function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    open: false,
    server: ['.']
  });

  gulp.watch('./js/**/*.js', ['js', reload]);
  gulp.watch('./styles/**/*.{less, css}', ['less', reload]);
});

gulp.task('build', ['less', 'js']);
