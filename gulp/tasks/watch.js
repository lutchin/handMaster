module.exports = function () {
	$.gulp.task('watch', function () {
		$.gulp.watch('./src/**/*.html', $.gulp.series('html'));
		$.gulp.watch('./src/styles/**/*.scss', $.gulp.series('sass:dev'));
		$.gulp.watch('./src/js/**/*.js', $.gulp.series('libsJS:dev', 'js:dev'));
		$.gulp.watch('./src/fonts/**/*.{woff, woff2}', $.gulp.series('fonts'));
		$.gulp.watch('./src/img/svg/*.svg', $.gulp.series('svg'));
		$.gulp.watch(['./src/img/general/**/*.{png,jpg,gif,webp}',
			'./src/img/content/**/*.{png,jpg,gif,webp}'
		], $.gulp.series('img:dev'));
		$.gulp.watch(['./src/img/general/**/*.svg',
			'./src/img/content/**/*.svg'
		], $.gulp.series('svg:dev'));
	});
};