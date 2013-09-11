# grunt-extdeps [![Dependency Status](https://david-dm.org/alanshaw/grunt-extdeps.png)](https://david-dm.org/alanshaw/grunt-extdeps)

> Get ordered project ExtJS dependencies

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-extdeps --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-extdeps');
```

## The "extdeps" task


### Overview

This task builds an ordered array of dependency paths by booting up your application in debug mode and inspecting the Ext.Loader history. 

The extdeps task creates a variable named `extdeps_[target]` which is an ordered array of file paths you can use in subsequent tasks.

For flexibility the extdeps task _doesn't_ add `ext-debug.js` to the list of paths it creates. This means you can add it as a static script on a CDN or something. Hence, if you want to concat and minify _everything_ then you'll need to manually add `ext-debug.js` to your concat files.

In your project's Gruntfile, add a section named `extdeps` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  extdeps: {
    your_target: {
      options: {
        // Task-specific options go here.
      }
    }
  }
})
```


### Options

#### options.url
Type: `String`
Default value: `./index.html`

REQUIRED. Your application entry point.

#### options.appNs
Type: `String`
Default value: `undefined`

REQUIRED. Your application namespace.

#### options.extPath
Type: `String`
Default value: `./extjs`

Path to ExtJS.

#### options.appPath
Type: `String`
Default value: `./app`

Path to your app.

#### options.rootPath
Type: `String`
Default value: `.`

Path to your the root of your website (used when depending on namespaces not belonging to your application).

#### options.appJs
Type: `String`
Default value: `./app.js`

Path to your app.js file.


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  extdeps: {
    dist: {
      options: {
        // The file extdeps should run to inspect the Ext.Loader.history to determine the dependencies
        url: 'index.html',
        // Your classes are named, for example, MyCompany.controller.Homepage
        appNs: 'MyCompany'
      }
    }
  },
  // The generated array can then be used in the concat/minify/other tasks
  concat: {
    dist: {
      src: '<%= extdeps_dist %>',
      dest: 'dist/app.js',
    }
  }
})
```

#### Custom Options
In this example, custom options are used to allow the plugin to be used when the frontend files are not in the same directory as the Gruntfile.

```js
grunt.initConfig({
  extdeps: {
    dist: {
      options: {
        url: 'wwwroot/index.html',
        appNs: 'MyCompany',
        extPath: 'wwwroot/extjs',
        appPath: 'wwwroot/app',
        rootPath: 'wwwroot',
        appJs: 'wwwroot/app.js'
      }
    }
  }
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2013-04-15   v0.0.4   Brand new
