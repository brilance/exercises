// Include gulp
const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('build', shell.task([
    'ng build --aot -prod'
]));

gulp.task('watch', function() {
    gulp.watch('src/app/**/*.{ts,css,html}', ['build']);
});