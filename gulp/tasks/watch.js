module.exports = function () {
	$.gulp.task('watch', function () {
		$.gulp.watch('./src/**/*.html', $.gulp.series('html'));
		$.gulp.watch('./src/styles/**/*.scss', $.gulp.series('sass:dev'));
		$.gulp.watch('./src/img/svg/*.svg', $.gulp.series('svg'));
		$.gulp.watch('./src/js/**/*.js', $.gulp.series('libsJS:dev', 'js:copy'));
		$.gulp.watch(['./src/img/general/**/*.{png,jpg,gif}',
			'./src/img/content/**/*.{png,jpg,gif}'
		], $.gulp.series('img:dev'));
	});
};