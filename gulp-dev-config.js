var gulp = require('gulp');
var sass = require('gulp-sass');
var template = require('gulp-template');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('sass:dev', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/static'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js:dev', function() {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/static'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('tpl:dev', function() {
    return gulp.src('src/tpl/*.html')
        .pipe(template({
          name: 'DK'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('default', ['js:dev', 'sass:dev', 'tpl:dev'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false
    });

    gulp.watch('src/js/*.js', ['js:dev']);
    gulp.watch('src/sass/*.scss', ['sass:dev']);
    gulp.watch('src/tpl/*.html', ['tpl:dev']);
});
