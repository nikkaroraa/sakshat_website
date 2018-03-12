// gulpfile.js
const gulp = require('gulp')
const concat = require('gulp-concat')

gulp.task('default', ['js', 'css', 'image', 'fonts'])

// JavaScript processing
gulp.task('js', function () {
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/moment/min/moment.min.js'
  ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/js'))

  return gulp.src('resources/assets/js/**')
    .pipe(gulp.dest('public/js'))
})

// CSS processing
gulp.task('css', function () {
  gulp.src([])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('public/css'))

  return gulp.src('resources/assets/css/**')
    .pipe(gulp.dest('public/css'))
})

// Image processing
gulp.task('image', function () {
  return gulp.src('resources/assets/img/**')
    .pipe(gulp.dest('public/img'))
})

// Fonts processing
gulp.task('fonts', function () {
  return gulp.src('resources/assets/icon_fonts_assets/**')
    .pipe(gulp.dest('public/icon_fonts_assets'))
})
