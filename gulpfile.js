var gulp = require('gulp');
var isTravis = process.env.TRAVIS || false;
var babel = require('gulp-babel'); 

gulp.task('travis', ['build', 'testServerJS'], function() {
	process.exit(0);
});
