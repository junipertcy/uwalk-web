// Grunt tasks

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/\n' +
		'* <%= pkg.name %> - v<%= pkg.version %> - MIT LICENSE <%= grunt.template.today("yyyy-mm-dd") %>. \n' +
		'* @author <%= pkg.author %>\n' +
		'*/\n',

		clean: {
			dist: ['src']
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			app: {
				src: ['modules/**/*.js', 'components/**/*.js']
			}
		},

		exec: {
			bowerInstaller: 'bower-installer'
		},

		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: false
			},
			base: {
				src: [
					// Angular Project Dependencies,
					'css/*.css',
					'modules/config.js',
					'modules/app.js',
					'modules/app.config.js',
					'modules/router.js',
					'modules/**/*Module.js',
					'modules/**/*Ctrl.js',
					'components/routers/*.js',
					'components/services/*.js',
					'components/directives/*.js'
				],
				dest: 'assets/js/<%= pkg.name %>-appbundle.js'
			},
			build: {
				src: [
					// Angular Project Dependencies,
					'assets/libs/angular/angular.js',
					'assets/libs/**/*.js'
				],
				dest: 'assets/js/<%= pkg.name %>-angularbundle.js'
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			base: {
				src: ['<%= concat.base.dest %>'],
				dest: 'assets/js/<%= pkg.name %>-angscript.min.js'
			},
			basePlugin: {
				src: [ 'assets/plugins/**/*.js' ],
				dest: 'assets/js/plugins/',
				expand: true,
				flatten: true,
				ext: '.min.js'
			}
		},

		connect: {
			server: {
				options: {
					keepalive: true,
					port: 4000,
					base: '.',
					hostname: 'localhost',
					debug: true,
					livereload: true,
					open: true
				}
			}
		},
		concurrent: {
			tasks: ['connect', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},

		watch: {
			app: {
				files: '<%= jshint.app.src %>',
				tasks: ['jshint:app'],
				options: {
					livereload: true
				}
			}
		},

		injector: {
			options: {},
			dev: {
				files: {
					'index.html': [
						'css/*.css',
						'bower.json',
						'modules/config.js',
						'modules/app.js',
						'modules/app.config.js',
						'modules/router.js',
						'modules/**/*Module.js',
						'modules/**/*Ctrl.js',
						'components/routers/*.js',
						'components/services/*.js',
						'components/directives/*.js'
					]
				}
			},
			production: {
				files: {
					'index.html': [
						'app/assets/css/**/*.css',
						'app/assets/js/*.js'
					]

				}
			}
		},

		ngtemplates: {
			app: {
				src: 'modules/**/*.html',
				dest: 'assets/js/templates.js',
				options: {
					module: '<%= pkg.name %>',
					root: 'app/',
					standAlone: false
				}
			}
		}



	});

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project if something fail.
	grunt.option('force', true);

	// Register grunt tasks
	grunt.registerTask("build", [
		"jshint",
		"exec",
		"concat",
		"ngtemplates",
		"injector:production",
		"concurrent",
		"clean"
	]);

	// Development task(s).
	grunt.registerTask('dev', ['injector:dev', 'concurrent']);

};
