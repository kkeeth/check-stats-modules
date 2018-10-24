const gulp    = require("gulp"),
      babel   = require("gulp-babel"),
      plumber = require('gulp-plumber'),
      rename  = require('gulp-rename')

const path = {
   "bin": "./src/bin/*.js",
   "lib": "./src/lib/*.js"
}

gulp.task('babel:bin', () => {
   return gulp.src(path.bin)
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
   return gulp.src(path.lib)
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

// watch files
gulp.task('watch', () => {
   gulp.watch(path.bin, gulp.series('babel:bin'))
   gulp.watch(path.lib, gulp.series('babel:lib'))
})

gulp.task('default', gulp.series('babel:bin', 'babel:lib', 'watch'))
