/**
 * System configuration for Angular 2.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': '@angular',
        'rxjs': 'rxjs'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        '@angular/common': { main: 'index.js', defaultExtension: 'js' },
        '@angular/compiler': { main: 'index.js', defaultExtension: 'js' },
        '@angular/core': { main: 'index.js', defaultExtension: 'js' },
        '@angular/http': { main: 'index.js', defaultExtension: 'js' },
        '@angular/platform-browser': { main: 'index.js', defaultExtension: 'js' },
        '@angular/platform-browser-dynamic': { main: 'index.js', defaultExtension: 'js' },
        '@angular/router-deprecated': { main: 'index.js', defaultExtension: 'js' },
    };

    var config = {
        map: map,
        packages: packages
    }
    System.config(config);
})(this);

System.import('app/main')
    .then(null, console.error.bind(console));

