var gulp = require('gulp'),
   uglify = require('gulp-uglify');

gulp.task('minify', function () {
   gulp.src('client_development/js/*')
      .pipe(uglify())
      .pipe(gulp.dest('public/js/'))
});
