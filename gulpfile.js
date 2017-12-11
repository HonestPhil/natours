var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    
    input = './sass/**/*.scss',
    output = './css',
    
    sassOptions = {
        errLogConsole: true,
        outputStyle: 'expanded'
    };
    
gulp.task('watch', function(){
    
    browserSync.init({
        notify: false,
        server: {
            baseDir: "Natours"
        }
    });
    
    watch('./index.html', function(){
        browserSync.reload();
    });
    
    watch(input, function(){
        gulp.start('cssInject');
    });
});

gulp.task('cssInject', ['sass'], function(){
    return gulp.src('./css/main.css')
    .pipe(browserSync.stream());
});


    
gulp.task('sass', function(){
    return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output));
});
    