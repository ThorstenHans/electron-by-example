const gulp = require('gulp'),
    runSequence = require('run-sequence')
    inject = require('gulp-inject');

let config = {
    sources: {
        appTemplates: 'src/app/**/*.html'
    },
    dependencies: {
        ng2: 'node_modules/@angular',
        rxjs: 'node_modules/rxjs',
        styles: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ]
    },
    dist: {
        root: 'dist',
        app: 'dist/app',
        styles: 'dist/styles'
    }
};

gulp.task('[private]:copy-ng2', () =>{
    return gulp.src(config.dependencies.ng2)
        .pipe(gulp.dest(config.dist.root));
});

gulp.task('[private]:copy-rxjs', () =>{
    return gulp.src(config.dependencies.rxjs)
        .pipe(gulp.dest(config.dist.root));
});

gulp.task('[private]:copy-styles', () =>{
    return gulp.src(config.dependencies.styles)
        .pipe(gulp.dest(config.dist.styles))
});

gulp.task('[private]:copy-app-templates', () =>{
    return gulp.src(config.sources.appTemplates)
        .pipe(gulp.dest(config.dist.app));
});

gulp.task('clean', ()=>{
    return del('dist/**/*', {force:true});
});

gulp