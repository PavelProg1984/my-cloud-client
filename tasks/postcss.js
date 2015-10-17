(function(module) {
    "use strict";

    var gulp = require('gulp'),
        postcss = require('gulp-postcss'),
        autoprefixer = require('autoprefixer');

    module.exports = function() {
        var processors = [
            autoprefixer({browsers: ['last 2 version']})
        ];
        return gulp.src('./client/assets/css/*.css')
            .pipe(postcss(processors))
            .pipe(gulp.dest('./client/dist'));
    };
}(module));