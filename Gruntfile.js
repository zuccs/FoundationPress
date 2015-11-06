module.exports = function (grunt) {
	// time
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {

			options: {
				// If you can't get source maps to work, run the following command in your terminal:
				// $ sass scss/foundation.scss:css/foundation.css --sourcemap
				// (see this link for details: http://thesassway.com/intermediate/using-source-maps-with-sass )
				sourceMap: true
			},

			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'assets/app.css': 'assets/scss/foundation.scss'
				}
			}

		},

		copy: {

			scripts: {
				expand: true,
				cwd: 'assets/components/foundation/js/vendor/',
				src: '**',
				flatten: 'true',
				dest: 'assets/javascript/vendor/'
			}

		},

		concat: {

			options: {
				separator: ';'
			},

			dist: {

				src: [

					// Foundation core
					'assets/components/foundation/js/foundation/foundation.js',

					// Pick the components you need in your project
					'assets/components/foundation/js/foundation/foundation.abide.js',
					'assets/components/foundation/js/foundation/foundation.accordion.js',
					'assets/components/foundation/js/foundation/foundation.alert.js',
					'assets/components/foundation/js/foundation/foundation.clearing.js',
					'assets/components/foundation/js/foundation/foundation.dropdown.js',
					'assets/components/foundation/js/foundation/foundation.equalizer.js',
					'assets/components/foundation/js/foundation/foundation.interchange.js',
					'assets/components/foundation/js/foundation/foundation.joyride.js',
					'assets/components/foundation/js/foundation/foundation.magellan.js',
					'assets/components/foundation/js/foundation/foundation.offcanvas.js',
					'assets/components/foundation/js/foundation/foundation.orbit.js',
					'assets/components/foundation/js/foundation/foundation.reveal.js',
					'assets/components/foundation/js/foundation/foundation.slider.js',
					'assets/components/foundation/js/foundation/foundation.tab.js',
					'assets/components/foundation/js/foundation/foundation.tooltip.js',
					'assets/components/foundation/js/foundation/foundation.topbar.js',

					// Include your own custom scripts (located in the custom folder)
					'assets/javascript/custom/*.js'

				],

				// Finally, concatenate all the files above into one single file
				dest: 'assets/javascript/foundation.js'

			}

		},

		uglify: {

			dist: {
				files: {
					// Shrink the file size by removing spaces
					'assets/javascript/foundation.js': ['dist/assets/app.js']
				}
			}

		},

		watch: {
			grunt: {files: ['Gruntfile.js']},

			sass: {
				files: 'assets/scss/**/*.scss',
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},

			js: {
				files: 'assets/javascript/custom/**/*.js',
				tasks: ['concat', 'uglify'],
				options: {
					livereload: true
				}
			},

			all: {
				files: '**/*.php',
				options: {
					livereload: true
				}
			}

		},

		browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'assets/stylesheets/*.css',
                        '**/*.php',
                        'assets/javascript/**/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    // fill in proxy address of local WP server
                    proxy: ""
                }
            }
        }
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('build', ['copy', 'sass', 'concat', 'uglify']);
	grunt.registerTask('browser-sync', ['browserSync', 'watch']);
	grunt.registerTask('default', ['watch']);
};
