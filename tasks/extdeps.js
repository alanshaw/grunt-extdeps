/*
 * grunt-extdeps
 * https://github.com/alanshaw/extdeps
 *
 * Copyright (c) 2013 Alan Shaw
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	
	grunt.registerMultiTask('extdeps', 'Roll up roll up get your ordered ExtJS dependency paths right here.', function() {
		
		var task = this;
		var _ = grunt.util._;
		
		// Grunt phantomjs lib gives us ability to communicate between grunt, phantomjs process and webpage
		var phantomjs = require('grunt-lib-phantomjs').init(grunt);
		
		var done = task.async();
		
		// Merge task-specific and/or target-specific options with these defaults.
		var options = task.options({url: '../../index.html', appNs: 'any', extPath: './extjs', appPath: './app', rootPath: '.'});
		
		grunt.verbose.writeflags(options);
		
		// Built-in error handlers.
		phantomjs.on('fail.load', function(url) {
			phantomjs.halt();
			grunt.warn('PhantomJS unable to load URL: ' + url);
		});
		
		phantomjs.on('fail.timeout', function() {
			phantomjs.halt();
			grunt.warn('PhantomJS timed out.');
		});
		
		phantomjs.on('error.onError', function(msg, trace) {
			phantomjs.halt();
			grunt.log.error(msg, trace);
			grunt.fatal(msg);
		});
		
		var history = [];
		
		phantomjs.on('extdeps.history', function(deps) {
			
			grunt.verbose.ok('Got some history...');
			
			deps.forEach(function(className) {
				grunt.verbose.writeln(className);
			});
			
			history = history.concat(deps);
			
			scheduleComplete();
		});
		
		grunt.verbose.ok('Spawning phantomjs...');
		
		// Summon phantomjs
		phantomjs.spawn(options.url, {
			options: {inject: __dirname + '/../phantomjs/bridge.js'},
			done: function(err) {
				if(err) {
					grunt.fatal(err);
				}
			}
		});
		
		var timeoutId;
		
		function scheduleComplete() {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(complete, 3000);
		}
		
		function complete() {
			
			var paths = [];
			
			history.forEach(function(className) {
				if(_.startsWith(className, 'Ext')) {
					paths.push(options.extPath + '/src/' + className.replace(/\./g, '/') + '.js');
				} else if(_.startsWith(className, options.appNs)) {
					paths.push(options.appPath + '/' + className.replace(options.appNs + '.', '').replace(/\./g, '/') + '.js');
				} else {
					paths.push(options.rootPath + '/' + className.replace(/\./g, '/') + '.js');
				}
			});
			
			grunt.verbose.ok('File paths are:');
			
			paths.forEach(function(path) {
				grunt.verbose.writeln(path);
			});
			
			var variable = 'extdeps_' + task.target;
			
			grunt.config.set(variable, paths);
			
			grunt.verbose.ok('Added ' + paths.length + ' paths to config variable ' + variable);
			
			phantomjs.halt();
			
			done();
		}
	});

};
