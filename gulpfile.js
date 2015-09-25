var gulp        = require('gulp'),
    coffee      = require('gulp-coffee'),
    less        = require('gulp-less'),
    uglify      = require('gulp-uglify'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    browserify  = require('gulp-browserify'),
    livereload  = require('gulp-livereload');


var shim = {
    "medium-editor": {
        path: "./bower_components/medium-editor/dist/js/medium-editor.js",
        exports: "MediumEditor"
    }
}

gulp.task('coffee', function() {
    return gulp.src("./coffee/**/*.coffee")
        .pipe(coffee())
        .pipe(gulp.dest("./js"))
});

gulp.task('less', function () {
    return gulp.src("./less/styles.less")
        .pipe(less())
        .pipe(gulp.dest("./dist/css"))
        .pipe(livereload())
});

gulp.task('scripts', ['coffee'],  function() {
    return gulp.src("./js/main.js")
        .pipe(browserify({shim: shim}))
        .pipe(rename("scripts.js"))
        .pipe(gulp.dest("./dist/js"))
        .pipe(livereload())
});

gulp.task('watch', function() {
    livereload.listen()
    gulp.watch("coffee/**/*.coffee", ['scripts'])
    gulp.watch("less/**/*.less", ['less'])
});

gulp.task('default', ['less', 'scripts', 'watch']);
