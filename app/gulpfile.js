var gulp       = require('gulp');
var sass       = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function() {
    return sass('./public/scss/main.scss', {
      container: 'gulp-ruby-sass',
      verbose: true
    })
    .pipe(gulp.dest('./public/stylesheets'))
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(reload({stream: true}))
  ;
});

gulp.task('develop', function(){
  browserSync({
    notify: false,
    port: 49000,
    ui: {
      port: 49900
    },
    server: {
      baseDir: ['./'],
      routes: {
        '/jspm_packages': '../jspm_packages',
        '/config.js': '../config.js'
      }
    }
  });
  // watch for changes
  gulp.watch([
    'lib/**/*.js',
    'lib/**/*.jsx',
    'index.html',
  ]).on('change', reload);
  gulp.watch('./public/scss/**/*.scss', ['sass']);

})

gulp.task('default', ['develop', 'sass']);
