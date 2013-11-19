# grunt-cmd-coffee

> 处理模块化后使用coffeescript编译合并后重复的coffeescript内置函数，如`__bind`,`__hasPro`,`__extends`,`__indexOf`等。

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cmd-coffee --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cmd-coffee');
```

## The "cmd_coffee" task

### Overview
In your project's Gruntfile, add a section named `cmd_coffee` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cmd_coffee: {
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

#### options.wrapper
Type: `boolean`
Default value: `true`

是否使用闭包包裹

### Usage Examples

```js
grunt.initConfig({
  cmd_coffee: {
    options: {
      wrapper: true
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
**November 19, 2013** `0.1.0`

First version.