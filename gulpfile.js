var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var include = require("gulp-include");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var colors = require('colors/safe');

// SASS, AUTOPREFIXR, MINIMIZE
gulp.task('sass', function() {
  var processors = [
        autoprefixer({browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
          ]})
    ];

  console.log('⬤  Run ' + colors.yellow('Sass') +
              ' + ' +
              colors.green('Autoprefixer')
              );

  return sass('src/scss/styles.scss')
    .pipe(postcss(processors))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({ stream:true }))
});

// JS
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
  .pipe(gulp.dest('assets/js/'))
  .pipe(reload({ stream:true }));
});

// INCLUDE BLOCKS IN HTML
gulp.task('include', function() {
  console.log(colors.blue('⬤  Include files to HTML... ⬤'));

  gulp.src('src/index.html')
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest('.'))
    .pipe(reload({ stream:true }));
});

// WATCH SASS, PREPROCESS AND RELOAD
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  });

  gulp.watch(['src/**/*.scss'], ['sass']);
  gulp.watch(['src/**/*.html'], ['include']);
  gulp.watch(['src/**/*.js'], ['js']);
});

gulp.task('default', function() {
  console.log(colors.rainbow('⬤  ================================ ⬤\n'));
  console.log('  AVAILABLE COMMANDS:');
  console.log('  ' + colors.cyan('-------------------\n'));
  console.log('  ' + colors.yellow('npm start') +
              ' — run local server with watcher');
  console.log(colors.rainbow('\n⬤  ================================ ⬤'));
});
