
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var gulp = require('gulp');
gulp.task('scripts', function() {
  return gulp.src('./dist/*.js')
    .pipe(concat('dist.merge.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

/*gulp.task('compress', function (cb) {
  pump([
        gulp.src('dist/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
*/
/*gulp.task('build', ['scripts', 'compress']);
*/
