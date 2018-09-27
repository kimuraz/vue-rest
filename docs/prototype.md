# The $api prototype

The $api prototype is a wrapper for [axios](https://github.com/mzabriskie/axios) and you can use it easily anywhere in your application, it accepts the same options that axios does, just pass the option object when setting VueRest up (see [Adding to your project](started.md)).

Example:

```js
export default {
  name: 'foodList',
  data() {
    return {
      ingredients: []
    }
  },
  created() {
    this.$api.get('/ingredients').then(res => {
      this.ingredients = res.data.results
    })
  }
}
```