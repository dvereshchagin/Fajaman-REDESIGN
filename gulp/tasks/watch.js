const gulp = require("gulp");
const watch = require("gulp-watch");
const BrowserSync = require("browser-sync").create();


gulp.task("watch", () => {
    BrowserSync.init({
        server: {
            baseDir: './src/dist'
        },
        notify: {
            styles: {
                top: "auto",
                bottom: 0
            }
        }
    })
});

// Pug
watch("./src/*.pug", () => {
    gulp.start("PugChanged");
});

// Styles
watch("./src/scss/**/*.scss", () => {
    gulp.start("cssInject");
});

gulp.task("PugChanged", ['PugRender'],() => {
    BrowserSync.reload();
});

gulp.task("cssInject", ['styles'], () => {
    gulp.src('./src/dist/styles.css')
    .pipe(BrowserSync.stream());
});