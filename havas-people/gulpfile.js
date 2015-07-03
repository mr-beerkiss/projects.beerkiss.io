var gulp = require("gulp"),
	del = require("del"),
	gutil = require("gutil"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	jshint = require("gulp-jshint"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	minifycss = require("gulp-minify-css");
	connect = require("gulp-connect"),
	watch = require("gulp-watch");

var paths = {
	scss: "src/scss/**/*.scss",
	"assets" : "src/assets/**/*",
	libs : [
		// specify any third party libraries here
	],
	js: "src/js/**/*.js",
	html: "src/**/*.html",
	dist: "dist",
};

gulp.task("clean", function(cb) {
	del([paths.dist], cb);	
});

gulp.task("copy-assets", function() {
	gulp.src(paths.assets)
		.pipe(gulp.dest(paths.dist))
		.on("error", gutil.log);	
});

gulp.task("copy-vendor", function() {
	gulp.src(paths.libs)
		.pipe(gulp.dest(paths.dist+"/lib"))
		.on("error", gutil.log);	
});


gulp.task("sass", function() {
	// TODO: Auto-prefixer
	gulp.src(paths.scss)
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false	
		}))
		//.pipe(minifycss())
		.pipe(gulp.dest(paths.dist+"/css"))
		.on("error", gutil.log);	
});

gulp.task("scripts", function() {
	gulp.src(paths.js)
		.pipe(jshint(".jshintrc"))
		.pipe(jshint.reporter("default"))
		.pipe(concat("main.min.js"))
		.pipe(gulp.dest(paths.dist+"/js"))
		.pipe(uglify({
			// some options here: https://www.npmjs.com/package/gulp-uglify
			// all options here: https://github.com/mishoo/UglifyJS2#the-simple-way
			outSourceMaps: false,	// for generating .map. files 
			mangle: true			// skip mangling names
			}))
		.pipe(gulp.dest(paths.dist+"/js"))
		.on("error", gutil.log);

});

gulp.task("copy-html", function() {
	gulp.src(paths.html)
		.pipe(gulp.dest(paths.dist))
		.on("error", gutil.log);	
});


gulp.task("connect", function() {
	connect.server({
		root: [__dirname + "/dist"],
		port: 9000,
		livereload: true
	});
});

gulp.task("watch", function() {
	
	// watch .scss files
	gulp.watch(paths.scss, ["sass"]);

	// watch the .js files
	gulp.watch(paths.js, ["scripts"]);

	// watch the html files
	gulp.watch(paths.html, ["copy-html"]);


	// Watch the image files
	// So, you can add image compression too.. but since I don't have any images at the moment I won't add it just yet
	// https://markgoodyear.com/2014/01/getting-started-with-gulp/
		// live reload
	watch("dist/**")
		.pipe(connect.reload())
		.on("error", gutil.log);
	
});

gulp.task("build", ["clean"], function() {
	gulp.start("sass", "scripts", "copy-assets", "copy-html", "copy-vendor");	
});

gulp.task("default", ["build"]);

gulp.task("dev", ["build"], function() {
	gulp.start("connect", "watch");
});
