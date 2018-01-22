var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var deploy      = require('gulp-gh-pages');


// Development Tasks
// -----------------

// BrowserSync server
gulp.task('browserSync', function() {
  browserSync({
  	files: ['app/**/*'],
    server: {
      baseDir: 'app'
    }
  })
})


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/**.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('app/**/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('docs'));
});

// Optimizing Images
gulp.task('img', function() {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('docs/img'))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('docs/fonts'))
});

// Build
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
});

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./docs/**/*")
    .pipe(deploy())
});

gulp.task('build', function(callback) {
  runSequence(
    'sass',
    ['useref', 'img', 'fonts'],
    callback
  )
})
