module.exports = function () {
	$.gulp.task('html', () => {
		return $.gulp.src('./src/*.html')
			.pipe($.gp.plumber())
			.pipe($.gp.fileInclude({
				prefix: '@',
				basepath: '@file'
			}))
			.on('error', $.gp.notify.onError(function (error) {
				return {
					title: 'HTML',
					message: error.message
				};
			}))
			.pipe($.gulp.dest('./build/'))
			.on('end', $.browserSync.reload);
	});
};