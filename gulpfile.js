const gulp = require('gulp');
const sync = require('browser-sync').create();
const reload = sync.reload;
const include = require('gulp-include');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const copy = require('gulp-copy');
const colors = require('colors/safe');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const mustache = require('gulp-mustache');
const data = {
  palettes: require('./src/js/data/palettes.js'),
  colors: require('./src/js/data/colors.js')
};

sass.compiler = require('node-sass');

// SASS, AUTOPREFIXR, MINIMIZE
gulp.task('scss', function () {
  var processors = [
    autoprefixer({
      browsers: [
        'last 1 version',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Opera versions',
        'last 2 Edge versions'
      ]
    })
  ];

  console.log('⬤  Run ' + colors.yellow('Scss') +
    ' + ' +
    colors.green('Autoprefixer') +
    ' + ' +
    colors.cyan('Cssnano') + ' ⬤'
  );

  return gulp.src('src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./assets/css'))
    .pipe(sync.stream())
    .pipe(postcss([cssnano()]))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({ stream: true }));
});

// JS
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('assets/js/'))
    .pipe(reload({ stream: true }));
});

gulp.task('ts', function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/js/index.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .on('error', function (error) {
      console.error(error);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('assets/js/'))
    .pipe(gulp.dest('assets/js/'))
    .pipe(reload({ stream: true }));
});

// INCLUDE BLOCKS IN HTML
gulp.task('include', function () {
  console.log(colors.blue('⬤  Include files to HTML... ⬤'));

  return gulp.src('src/index.html')
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest('.'))
    .pipe(reload({ stream: true }));
});

// TEMPLATES
gulp.task('tmpl', function () {
  console.log(colors.blue('⬤  Templating in HTML... ⬤'));

  return gulp.src('*.html')
    .pipe(mustache(data))
    .pipe(gulp.dest('./'))
    .pipe(reload({ stream: true }));
});

// WATCH SASS, PREPROCESS AND RELOAD
gulp.task('serve', gulp.series(['include', 'tmpl', 'scss', 'js', 'ts'],
  function () {
    sync.init({
      ui: false,
      notify: false,
      port: 3000,
      server: {
        baseDir: '.'
      }
    });

    gulp.watch(['src/**/*.scss'], gulp.series('scss'));
    gulp.watch(['src/**/*.html'], gulp.series('include', 'tmpl'));
    gulp.watch(['src/**/*.js'], gulp.series('js'));
    gulp.watch(['src/**/*.ts'], gulp.series('ts'));
  }));

// CLEAN BUILD
gulp.task('clean', function () {
  return del(['build/*'])
    .then(paths => {
      console.log('⬤  Deleted files and folders:\n', paths.join('\n'));
    });
});

// CLEAN BUILD & COPY FILES TO IT
gulp.task('copy', function () {
  console.log(colors.magenta('⬤  Copy files to build/ ⬤'));

  return gulp.src(['assets/**/*', '*.html'])
    .pipe(copy('build/'));
});

// BUILD
gulp.task('build', gulp.series(['clean'], ['scss', 'include', 'tmpl', 'copy']));

gulp.task('default', function () {
  console.log(colors.rainbow('⬤  ================================ ⬤\n'));
  console.log('  AVAILABLE COMMANDS:');
  console.log('  ' + colors.cyan('-------------------\n'));
  console.log('  ' + colors.yellow('npm start') +
    ' — run local server with watcher');
  console.log('  ' + colors.green('npm run build') +
    ' — make build of the project');
  console.log('  ' + colors.cyan('npm run deploy') +
    ' — make build and publish project to Github Pages');
  console.log(colors.rainbow('\n⬤  ================================ ⬤'));
});
