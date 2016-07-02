const gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    ts = require('gulp-typescript'),
    tsConfig = ts.createProject('./tsconfig.json'),
    inject = require('gulp-inject');

let config = {
    injectables:[
               
                './dist/styles/bootstrap.min.css',
                './dist/vendor/shim.min.js',
                './dist/vendor/zone.min.js',
                './dist/vendor/Reflect.js',
                './dist/vendor/system.js',
                './dist/scripts/system.config.js',
    ],
    sources: {
        htmlFiles: 'src/index.html',
        appFiles: 'src/**/*.ts',
        appTemplates: ['src/**/*.html', '!src/index.html'],
        systemjsconfig: 'src/system.config.js'
    },
    dependencies: {
        scripts: [
            './node_modules/systemjs/dist/system.js',
            './node_modules/zone.js/dist/zone.min.js',
            './node_modules/core-js/client/shim.min.js',
            './node_modules/reflect-metadata/Reflect.js'
        ],
        ng2: 'node_modules/@angular/**/*',
        rxjs: 'node_modules/rxjs/**/*',
        styles: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css'
        ]
    },
    dist: {
        root: 'dist',
        ng2: 'dist/@angular',
        rxjs: 'dist/rxjs',
        app: 'dist/app',
        styles: 'dist/styles',
        vendor: 'dist/vendor',
        scripts: 'dist/scripts'
    }
};

gulp.task('[private]:copy-ng2', () =>{
    return gulp.src(config.dependencies.ng2)
        .pipe(gulp.dest(config.dist.ng2));
});

gulp.task('[private]:copy-rxjs', () =>{
    return gulp.src(config.dependencies.rxjs)
        .pipe(gulp.dest(config.dist.rxjs));
});

gulp.task('[private]:copy-deps', ()=>{
    return gulp.src(config.dependencies.scripts)
        .pipe(gulp.dest(config.dist.vendor));
});

gulp.task('[private]:copy-systemjsconfig', () =>{
    return gulp.src(config.sources.systemjsconfig)
        .pipe(gulp.dest(config.dist.scripts));
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

gulp.task('build-app', () =>{
     return gulp.src(config.sources.appFiles)
                .pipe(ts(tsConfig))
                .pipe(gulp.dest(config.dist.app));
});

gulp.task('[private]:build-html', () =>{
    let injectables = gulp.src(config.injectables);

    return gulp.src(config.sources.htmlFiles)
        .pipe(inject(injectables, {ignorePath: 'dist', addRootSlash: false}))
        .pipe(gulp.dest(config.dist.root));

});

gulp.task('default', (done)=>{
    return runSequence(
        'clean',
        'build-app',
        '[private]:copy-systemjsconfig',
        '[private]:copy-ng2',
        '[private]:copy-deps',
        '[private]:copy-rxjs',
        '[private]:copy-styles',
        '[private]:copy-app-templates',
        '[private]:build-html',
        done);
});