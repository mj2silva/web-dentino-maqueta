const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const { series, watch } = require('gulp');

const distFolder = (process.env.NODE_ENV === 'ghpages') ? 'docs' : 'dist'

function compileSass() {
  return gulp.src(['src/scss/global.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest(`${distFolder}/css`))
    .pipe(browserSync.stream());
}

function compilePug() {
  return gulp.src(['src/pug/*.pug'])
    .pipe(pug())
    .pipe(gulp.dest(distFolder))
    .pipe(browserSync.stream());
}

function transpileJs() {
  return gulp.src(['src/js/*.js'])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(`${distFolder}/js`))
    .pipe(browserSync.stream());;
}

function minifyImages() {
  return gulp.src(['src/assets/img/*'])
    .pipe(imagemin())
    .pipe(gulp.dest(`${distFolder}/assets/img`))
    .pipe(browserSync.stream());
}

function moveHtml() {
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest(distFolder))
}

function loadIcons() {
  return gulp.src(['src/assets/icons/*'])
    .pipe(gulp.dest(`${distFolder}/assets/icons`))
}

function cleanDist() {
  return del([
    `${distFolder}/*`, `!${distFolder}/fonts`
  ])
}

function serve() {
  browserSync.init({
    server: `./${distFolder}`
  });
  watch('src/js/**/*.js', {usePolling: true}, transpileJs);
  watch('src/scss/**/*.scss', {usePolling: true}, compileSass);
  watch('src/pug/**/*.pug', {usePolling: true}, compilePug);
  watch(['src/assets/img/**/*.svg', 'src/assets/img/**/*.jpg', 'src/assets/img/**/*.png'], {usePolling: true}, minifyImages);
  watch(['src/assets/icons/**/*.ico', 'src/assets/icons/**/*.png'], {usePolling: true}, loadIcons);
  watch('src/*.html', moveHtml);
  watch(`${distFolder}/*.html`,{usePolling: true},).on('change', browserSync.reload);
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'ghpages') {
  exports.default = series(cleanDist, transpileJs, compileSass, compilePug, minifyImages, moveHtml, loadIcons);
} else {
  exports.default = series(cleanDist, transpileJs, compileSass, compilePug, minifyImages, moveHtml, loadIcons, serve);
}
