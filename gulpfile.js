const gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    ts = require('gulp-typescript'),
    path = require('path'),
    electron = require('gulp-awesome-electron'),
    tsConfig = ts.createProject('./tsconfig.json'),
    symdest = require('gulp-symdest'),
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
    cleanupLocations: [
        'dist/**/*',
        'build/**/*'
    ],
    sources: {
        htmlFiles: 'src/index.html',
        appFiles: 'src/**/*.ts',
        appTemplates: ['src/**/*.html', '!src/index.html'],
        systemjsconfig: 'src/system.config.js',
        electronBits: 'electron/**/*'
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
        scripts: 'dist/scripts',
        appFolder: 'app-package'

    }
};

let buildElectronAppFor = (platform, outputfolder) =>{
return gulp.src(path.join(config.dist.appFolder, '**', '*'))
                .pipe(electron({
                    version: '1.2.5',
                    platform: platform,
                    arch: 'x64',
                    companyName: 'Thinktecture AG'
                }))
                .pipe(symdest(path.join(`build/${outputfolder}`)));
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

gulp.task('[private]:build-all-apps', ()=>{
    buildElectronAppFor('win32', 'win');
    buildElectronAppFor('darwin', 'osx');
    buildElectronAppFor('linux', 'linux');
});
gulp.task('[private]:copy-systemjsconfig', () =>{
    return gulp.src(config.sources.systemjsconfig)
        .pipe(gulp.dest(config.dist.scripts));
});

gulp.task('[private]:generate-electron-output', () =>{
    return gulp.src([
            path.join(config.dist.root, '**/*'),
            config.sources.electronBits
        ])
        .pipe(gulp.dest(config.dist.appFolder));

        
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
    return del(config.cleanupLocations, {force:true});
});

gulp.task('[private]:build-angular2-app', () =>{
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

gulp.task('[private]:after-build-cleanup', ()=>{
    return del(config.dist.appFolder, {force:true});
});

gulp.task('default', (done)=>{
    return runSequence(
        'clean',
        [
            '[private]:build-angular2-app',
            '[private]:copy-systemjsconfig',
            '[private]:copy-ng2',
            '[private]:copy-deps',
            '[private]:copy-rxjs',
            '[private]:copy-styles',
            '[private]:copy-app-templates'],
            '[private]:build-html',
            '[private]:generate-electron-output',
            '[private]:build-all-apps',
            '[private]:after-build-cleanup'
        done);
});