var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var lab = require('gulp-lab');

// Restart the server for changes.
gulp.task('default', function () {
    nodemon({
        script: 'index.js'
    });
});

gulp.task('test', function () {
    gulp.src('./*.spec.js').pipe(lab());
});
