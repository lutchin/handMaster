module.exports = function() {
  $.gulp.task('img:dev', () => {
    return $.gulp.src('./src/img/**/*.{png,jpg,gif,webp}')
      .pipe($.gulp.dest('./build/img/'));
  });

  $.gulp.task('img:build', () => {
    return $.gulp.src('./src/img/**/*.{png,jpg,gif}')
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

  $.gulp.task('svg:copy', () => {
    return $.gulp.src(['./src/img/general/*.svg', './src/img/content/*.svg'])
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gulp.dest('./build/img/**/*.svg'));
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
