module.exports = function() {
  $.gulp.task('img:dev', () => {
    return $.gulp.src(['./src/img/**/*.{png,jpg,gif,webp,svg}','!./src/img/svg/*'])
      .pipe($.gulp.dest('./build/img/'));
  });

  $.gulp.task('img:build', () => {
    return $.gulp.src('./src/img/**/*.{png,jpg,gif,svg}')
      .pipe($.gp.plumber())
      .pipe($.gp.imagemin({
        optimizationLevel: 5,
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [$.png()]
      }))
      .pipe($.gulp.dest('./build/img/'));
  });

  $.gulp.task('webp', () => {
    return $.gulp.src('./src/img/**/*.{png,jpg}')
      .pipe($.gp.plumber())
      .pipe($.gp.imagemin([
        $.webp({
          quality: 80
        })
      ]))
      .pipe($.extReplace('.webp'))
      .pipe($.gulp.dest('./build/img/'));
  });
};
