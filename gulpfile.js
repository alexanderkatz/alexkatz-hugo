// at site root gulpfile.js
const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);
const cleanCSS = require('gulp-clean-css');

function styles() {
  return gulp.src('themes/curlew/scss/**/*.scss')     // <— source in theme
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('static/css/'));                        // <— output at site root
}

function watchFiles() {
  gulp.watch('themes/curlew/scss/**/*.scss', styles);
}

exports.sass = styles;
exports.default = watchFiles;
