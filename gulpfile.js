var gulp = 			require('gulp');
	sass = 			require('gulp-sass');
	browserSync = 	require('browser-sync');
    concat =        require('gulp-concat');
    uglify =        require('gulp-uglifyjs');
    cssnano =       require('gulp-cssnano');
    rename =        require('gulp-rename');
    del =           require('del');
    imagemin =      require('gulp-imagemin');
    pngquant =      require('imagemin-pngquant');
    cache =         require('gulp-cache');
    autoprefixer =  require('gulp-autoprefixer');
    fileinclude =   require('gulp-file-include');
	watch = 		require('gulp-watch');


gulp.task('sass', function(){
	return gulp.src('app/scss/*.scss')
	.pipe(sass())
    .pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

//SCRIPTS concat+uglify
gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/ui/jquery-ui.js',
        'app/libs/modernizr/modernizr.min.js',
        'app/libs/flexibility/flexibility.js',
        'app/libs/magnific/jquery.magnific-popup.js',
        'app/libs/formstyler/jquery.formstyler.min.js',
        'app/libs/slick/slick.min.js',
        'app/libs/tooltip/tooltipster.bundle.min.js',
        'app/libs/mask/jquery.maskedinput.min.js',
        'app/libs/paintbrush/paintbrush.js',
        'app/libs/scroll/scrollTo.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src([
        'app/css/libs.css',
        'app/css/style.css',
    ])
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('browser-sync', function() {
    browserSync({
    	server: {
    		baseDir: 'app',
    	},
    	notify: false
    })
});


gulp.task('watch', ['browser-sync','css-libs', 'scripts','scripts-interface','scripts-coverage-map','scripts-cities','scripts-salon-map-test','scripts-map-list-search','scripts-step-map'], function() {
    gulp.watch('app/scss/*.scss', ['sass']); // Наблюдение за sass файлами
    // Наблюдение за другими типами файлов
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

//SCRIPTS INTERFACE
gulp.task('scripts-interface', function(){
    return gulp.src([
        'app/js/interface.js',
    ])
    .pipe(concat('interface.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

//SCRIPTS INTERFACE
gulp.task('scripts-coverage-map', function(){
    return gulp.src([
        'app/js/coverage-map.js',
    ])
    .pipe(concat('coverage-map.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

//SCRIPTS INTERFACE
gulp.task('scripts-cities', function(){
    return gulp.src([
        'app/js/cities.js',
    ])
    .pipe(concat('cities.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});
//SCRIPTS INTERFACE
gulp.task('scripts-salon-map-test', function(){
    return gulp.src([
        'app/js/salon-map-test.js',
    ])
    .pipe(concat('salon-map-test.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});
//SCRIPTS INTERFACE
gulp.task('scripts-map-list-search', function(){
    return gulp.src([
        'app/js/map-list-search.js',
    ])
    .pipe(concat('map-list-search.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});
//SCRIPTS INTERFACE
gulp.task('scripts-step-map', function(){
    return gulp.src([
        'app/js/step-map.js',
    ])
    .pipe(concat('step-map.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});



//CLEAN
gulp.task('clean', function() {
    return del.sync('dist');
});


//IMAGEMIN
gulp.task('img', function(){
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced:true,
        progrssive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'))
});

//BUILD version
gulp.task('build', ['clean', 'img', 'sass', 'css-libs', 'scripts','scripts-interface','scripts-coverage-map','scripts-cities','scripts-salon-map-test','scripts-map-list-search','scripts-step-map'], function() {

    var buildCss = gulp.src([
        'app/css/style.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

//CLEAR CACHE
gulp.task('clear', function() {
    return cache.clearAll();
});


//DEFAULT
gulp.task('default', ['watch','browser-sync','css-libs', 'scripts']);