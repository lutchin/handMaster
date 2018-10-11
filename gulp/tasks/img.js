module.exports = function () {
	$.gulp.task('img:dev', () => {
		return $.gulp.src('./src/img/**/*.{png,jpg,gif}')
			.pipe($.gulp.dest('./build/img/'));
	});

	$.gulp.task('img:build', () => {
		return $.gulp.src('./src/img/**/*.{png,jpg,gif}')
			.pipe($.gp.plumber())
			.pipe($.gp.imagemin({
				optimizationLevel: 3,
				progressive: true,
				svgoPlugins: [{
					removeViewBox: false
				}],
				use: [$.png()]
			}))
			.pipe($.gulp.dest('./build/img/'));
	});

	$.gulp.task('svg:copy', () => {
		return $.gulp.src('./src/img/general/*.svg')
			.pipe($.gulp.dest('./build/img/general/'));
	});
};