var gulp = require('gulp')
  , less = require('gulp-less')
  , csso = require('gulp-csso')
  , prefixer = require('gulp-autoprefixer')
  , browserify = require('gulp-browserify')
  , uglify = require('gulp-uglify');

gulp.task('less', function () {
  return gulp.src('./styles/app.less')
    .pipe(less())
    .pipe(prefixer([
      'Chrome >= 34',
      'Firefox >= 28',
      'Explorer >= 8']))
    .pipe(csso())
    .pipe(gulp.dest('./styles/app.css'));
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
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./styles/**/*.less', ['less']);
});

gulp.task('build', ['less', 'js']);
