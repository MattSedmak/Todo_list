// variables.
let gulp = require("gulp");
let sass = require("gulp-sass");
let csso = require("gulp-csso");
let minify = require("gulp-minify");
let rename = require("gulp-rename");

// css task.
function style() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass()) // compile scss to css.
    .pipe(gulp.dest("css")) // send compiled scss to css folder.
    .pipe(csso()) // minimise the css file.
    .pipe(rename({ suffix: ".min" })) // remname file with .min suffix.
    .pipe(gulp.dest("dist/css")); // send minimised css to dist folder.
}
//Js task
function scripts() {
  return gulp
    .src("js/*.js")
    .pipe(minify({ noSource: true })) // minimise js file
    .pipe(gulp.dest("dist/js")); // send minimised js files to dist folder.
}

// Watch files.
function watch() {
  gulp.watch("scss/**/*.scss", style);
  gulp.watch("js/*.js");
}
// Default task.
gulp.task("default", gulp.series(style, scripts, watch));
