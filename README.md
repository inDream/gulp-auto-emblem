# gulp-auto-emblem [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]

This is a gulp plugin to process [Emblem.js](http://emblemjs.com) templates specifically for [Ember](http://emberjs.com/) with plain module.  
Modified from [gulp-ember-emblem].

## Usage

First, install _gulp-auto-emblem_:

```shell
npm install gulp-auto-emblem
```

Then, add it to your `gulpfile.js`:

```javascript
var autoEmblem = require('gulp-auto-emblem');

gulp.task('templates', function(){
  gulp.src(['client/templates/*.emblem'])
    .pipe(autoEmblem())
    .pipe(gulp.dest('build/templates/'));
});
```

gulp-auto-emblem outputs a raw `Ember.Handlebars.template` function, so it is likely that you will want to use [gulp-ember-emblem] to make the handlebars template available via a specific namespace or for use with a module system. For additional usage examples, we recommend that you visit [gulp-ember-emblem].

Default template name is chosen from the file name. For example `index.index.emblem` -> `index/index`

### Options

#### rootPath
Type: `String`

Specify the path to your template folder. This is only used when registering the template names.  
For example if your template is at the path `app/templates/posts/teaser.emblem` and `app/templates` is set as your root then the template's name will be `posts/teaser`

#### compilerOptions
Type: `Object`

Compiler options to pass to `Emblem.precompile()`.


[travis-url]: http://travis-ci.org/inDream/gulp-auto-emblem
[travis-image]: https://secure.travis-ci.org/inDream/gulp-auto-emblem.png?branch=master
[npm-url]: https://npmjs.org/package/gulp-auto-emblem
[npm-image]: https://badge.fury.io/js/gulp-auto-emblem.png

[gulp-ember-emblem]: https://github.com/wbyoung/gulp-ember-emblem
