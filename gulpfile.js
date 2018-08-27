const gulp    = require("gulp"),
      babel   = require("gulp-babel"),
      plumber = require('gulp-plumber'),
      rename  = require('gulp-rename')

const path = {
   "bin": "./src/bin/*.js",
   "lib": "./src/lib/*.js"
}

gulp.task('babel:bin', () => {
   gulp.src(path.bin)
      .pipe(plumber({
         errorHandler: (err) => {
            console.log(err)
         }
      }))
      .pipe(babel({
         presets: ['es2015']
      }))
      .pipe(rename({
         extname: ''
      }))
      .pipe(gulp.dest('./bin'))
})

gulp.task('babel:lib', () => {
  gulp.src(path.lib)
    .pipe(plumber({
      errorHandler: (err) => {
        console.log(err)
      }
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./lib'))
})

gulp.task('watch', () => {
   gulp.watch(path.bin, ['babel:bin'])
   gulp.watch(path.lib, ['babel:lib'])
});

gulp.task('default', ['babel:bin', 'babel:lib', 'watch'])
