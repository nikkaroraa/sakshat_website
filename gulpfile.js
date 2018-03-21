// gulpfile.js
const gulp = require('gulp')
const concat = require('gulp-concat')

gulp.task('default', ['js', 'css', 'image', 'fonts', 'watch'])

// JavaScript processing
gulp.task('js', function () {
  gulp.src([
    'node_modules/moment/min/moment.min.js',
    'node_modules/toastr/build/toastr.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/clientjs/dist/client.min.js',
    'node_modules/fingerprintjs2/dist/fingerprint2.min.js'
  ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/js'))

  return gulp.src('resources/assets/js/**')
    .pipe(gulp.dest('public/js'))
})

// CSS processing
gulp.task('css', function () {
  gulp.src([
    'node_modules/toastr/build/toastr.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
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
  return gulp.src('resources/assets/fonts/**')
    .pipe(gulp.dest('public/fonts'))
})

gulp.task('watch', function () {
  gulp.watch('resources/assets/js/**', ['js'])
  gulp.watch('resources/assets/css/**', ['css'])
  gulp.watch('resources/assets/img/**', ['image'])
  gulp.watch('resources/assets/fonts/**', ['fonts'])
})
