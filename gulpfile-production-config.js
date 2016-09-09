var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

gulp.task('test', function() {
    return console.log('this is a test');
});

gulp.task('sass', ['clean'], function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass({
            outputStyle: 'compressed' //编译并输出压缩过的文件
        }))
        .pipe(rev()) //给css添加哈希值
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest()) //给添加哈希值的文件添加到清单中
        .pipe(gulp.dest('rev/css'));
});

gulp.task('js', ['clean'], function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rev()) //给js添加哈希值
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest()) //给添加哈希值的文件添加到清单中
        .pipe(gulp.dest('rev/js'));
});

gulp.task('html', ['clean'], function() {
    return gulp.src('src/tpl/*.html')
        .pipe(gulp.dest('dist'));
});

//将处理过的css，js引入html
gulp.task('revCollector', ['sass', 'js', 'html'], function() {
    gulp.src(['rev/**/*.json', 'dist/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('dist'));
});

//每次打包时先清空原有的文件夹
gulp.task('clean', function() {
    gulp.src(['dist', 'rev'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('build', ['revCollector']);
