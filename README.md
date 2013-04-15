# grunt-extdeps

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
In your project's Gruntfile, add a section named `extdeps` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  extdeps: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
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
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  extdeps: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  extdeps: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
