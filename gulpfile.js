var gulp = require('gulp');
var deploy = require('gulp-gh-pages');
var exec = require('child_process').exec;
var fs = require('fs');

gulp.task('mkdir-build', function(callback){
	fs.exists('build', function(exists){
		if (!exists) {
			fs.mkdir('build', callback);
		} else {
			callback();
		}
	});
});

gulp.task('test-badge', ['mkdir-build'], function(callback) {
		console.log('mkdir-build passed');
  exec('./node_modules/mocha/bin/_mocha --reporter ../../../index.js > build/mocha-badge.svg', callback);
});

gulp.task('git-config', function(callback){
		console.log('test-badge passed');
	exec('git config --global user.email "sakshi.nagpal@comprotechnologies.com" && git config --global user.name "sakshinagpal"', callback);
});

gulp.task('deploy-build', ['test-badge', 'git-config'], function() {
		console.log('tgit-config passed');
		console.log(process.env.githubToken);
	var deployOptions = {
		cacheDir: './build/repos/mocha-reporter-badge'
	};
	if (process.env.githubToken) {
		console.log('"githubToken" environment variable found, use it to authenticate to github');
		deployOptions.remoteUrl = 'https://' + process.env.githubToken + '@github.com/sakshinagpal/mocha-reporter-badge';
	}
	return gulp.src('./build/**/*')
		.pipe(deploy(deployOptions));
});

gulp.task('default', ['test-badge']);
