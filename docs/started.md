# Getting Started

## Installing

To install the plugin simply do:

```sh
$ yarn add vue-rest

# OR

$ npm install vue-rest
```

## Adding to your project

To add to your project, import it and the use `Vue.use(VueRest)` to properly use it.

> Optionally you can add `axiosOptions` that is responsible for any options related to [axios]('https://github.com/mzabriskie/axios%29/')

```js
...
import VueRest from 'vue-rest';
...

Vue.use(VueRest, {
  axiosOptions: {
    baseURL: 'http://localhost/api/',
  }
});
```

## Using ApiForm and ApiList

These two mixins implements some methods, props and data to your component, to use them, do:

```js
import { ApiForm } from 'vue-rest';

export default {
  ...
  mixins: [ApiForm]
  ...
}
```

```js
import { ApiList } from 'vue-rest';

export default {
  ...
  mixins: [ApiList]
  ...
}
```