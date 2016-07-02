'use strict';
var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , minifyCSS = require('gulp-minify-css')
  , jshint = require('gulp-jshint')
  , jscs = require('gulp-jscs')
  , rimraf = require('rimraf')
  , minifyHTML = require('gulp-minify-html')
  , gulpCopy = require('gulp-copy')
  , usemin = require('gulp-usemin')
  , flatten = require('gulp-flatten')
  , rev = require('gulp-rev')
  , RevAll = require('gulp-rev-all')
  , filter = require('gulp-filter')
  , csso = require('gulp-csso')
  , useref = require('gulp-useref')
  , rename = require('gulp-rename')
  , fs = require('fs')
  , copyDir = require('copy-dir')
  ;

var paths = {
  // for watch use
  scripts: [
    'components/directives/*.js',
    'components/filters/*.js',
    'components/routers/*.js',
    'components/services/*.js',
    'modules/**/*.js'
  ],
  // release
  release: {
    staticFiles: [
      './bower_components/**/*',
      './assets/img/**/*'
    ],
    fonts: [
      './bower_components/font-awesome/fonts/*',
      './bower_components/bootstrap/fonts/*'
    ]
  },
  output: './prepare',
  backup: './backup'
};

gulp.task('clean', ['auto-backup'], function () {
  rimraf.sync('./prepare');
  rimraf.sync('./rev');
});

gulp.task('jshint', function() {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function () {
  return gulp.src(paths.scripts)
    .pipe(jscs());
});

gulp.task('watch', function () {
  return gulp.watch(paths.scripts, ['jshint', 'jscs']);
});

gulp.task('copyStaticFile', ['copyFonts'], function () {
  return gulp.src(paths.release.staticFiles)
    .pipe(gulpCopy(paths.output));
});

gulp.task('copyFonts', function () {
  return gulp.src(paths.release.fonts)
    .pipe(flatten())
    .pipe(gulp.dest(paths.output + '/fonts'));
});

gulp.task('usemin', ['copyStaticFile', 'md5-all'], function () {
  return gulp.src(paths.output + '/*.html', {base: paths.output})
    .pipe(usemin({
      css: [rev],
      assets: [rev],
      angular: [rev],
      app: [rev]
    }))
    .pipe(gulp.dest(paths.output))
    ;
});

gulp.task('uglifyJs', ['jshint', 'usemin'], function () {
  return gulp.src([
    paths.output + '/js/*.js'
  ]).pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest(paths.output + '/js/'));
});

gulp.task('rename-index', ['clean', 'uglifyJs'], function () {
  return gulp.src(paths.output + '/*.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.output))
    ;
});

gulp.task('md5-all', function () {
  var files = {
    js: [
      './components/**/*.js',
      './modules/**/*.js'
    ],
    html: [
      './components/**/*.html',
      './modules/**/*.html'
    ],
    css: [
      './css/**/*.css'
    ]
  };
  var jsFilter = filter(files.js, {restore: true}),
    htmlFilter = filter(files.html, {restore: true}),
    cssFilter = filter(files.css, {restore: true});

  var revAll = new RevAll({
    debug: !true,
    replacer: function (fragment, replaceRegExp, newReference, referencedFile) {
      //这里修正了gulp-rev-all的替换规则,目的是不替换跟文件名同名的变量
      if (newReference.indexOf('/') === -1) {
        fragment.contents = fragment.contents.replace(replaceRegExp, '$1' + '$2' + '$3$4');
      } else {
        fragment.contents = fragment.contents.replace(replaceRegExp, '$1' + newReference + '$3$4');
      }
    }
  });

  return gulp.src([
      './components/**',
      './modules/**',
      './css/**',
      'index.html'
    ])
    .pipe(htmlFilter)
    .pipe(minifyHTML())
    .pipe(useref())
    .pipe(htmlFilter.restore)

    .pipe(jsFilter)
    .pipe(uglify({
      mangle: false
    }))
    .pipe(jsFilter.restore)

    //css
    .pipe(cssFilter)
    .pipe(minifyCSS())
    .pipe(csso())
    .pipe(cssFilter.restore)
    //
    .pipe(revAll.revision())

    .pipe(gulp.dest(paths.output))

    .pipe(revAll.manifestFile())
    .pipe(gulp.dest('./rev'))
    ;
});

gulp.task('auto-backup', function () {
  var date = new Date(),
    dirName = date.toISOString().split('T')[0].replace(/[\D]/g, ''),
    reg = /^\d+$/g,
    build = './build';
  dirName = paths.backup + '/' + dirName;

  fs.exists(build, function (exists) {
    if (exists) {
      fs.exists(dirName, function (exist) {
        if (!exist) {
          backup();
        }
      });
    }
  });
  function backup() {
    fs.readdir('./backup', function (err, data) {
      var dirs = [], l;
      if (data && data.length > 0) {
        for (var i = 0, j = data.length; i < j; i++) {
          if (data[i].match(reg)) {
            dirs.push(data[i]);
          }
        }
        if (dirs.length > 2) {
          for (i = 0, l = dirs.length; i < l - 1; i++) {
            rimraf.sync('./backup/' + dirs[i]);
          }
        }
        rimraf.sync(dirName);
      }
      copyDir.sync(build, dirName);
    });
  }
});

gulp.task('renameDir', ['rename-index'], function () {
  rimraf.sync('./build');
  return gulp.src('prepare/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['watch']);
gulp.task('release', ['renameDir']);