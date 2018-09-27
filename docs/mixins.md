# Mixins

## ApiForm
### Intro

The ApiForm is responsible for implementing the methods for API requesting that usually a form does.

It requires a `route prop` and, for convenience, can handle two others props `objId` and `obj`. Both props are handled in mixin's `created()` hook, and the `obj` sets the `requestObj` data to its value and the `objId` loads a new instance of a object to `requestObj` returned from API in the `load()` method.

> See: [Vue Lifecycle Hooks](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)

### Methods

The following methods are implemented through this mixin:

`load(id, errCallback)`:

- Params: id, errCallback

- Functionality: It does a GET request to the given route /id and loads the response.data to the requestObj data.

`save(callback, errCallback)`:
- Params: callback, errCallback
- Functionality: It passes the received callback and errCallback to one of the following methods:
    - If the `requestObj` has an id `(requestObj.id)`:
        * `update(callback, errCallback)`:
            - Params: callback, errCallback
            - Functionality: It uses the $api prototype to do a PATCH requests using the given route and passing the requestObj as payload, passing the success response to the callback function and if there's any error it passes the it to the errCallback function.
    - Otherwise:
        * create(callback, errCallback):
            - Params: callback, errCallback
            - Functionality: It does the same thing as the update method but instead of a PATCH it does a POST to the API.`

### Using it

> Note that you need to pass a `route` prop or override the prop as:
>
> `route: { required: false, default: 'your-route' }`

```vue
<template>
    <form @submit.prevent="save(showOk, showErr)">
        <input v-model="requestObj.firstName"/>
        <input v-model="requestObj.lastName"/>
        <button type="submit">
            Add
        </button>
    </form>
</template>

<script>
import { ApiForm } from 'vue-rest'

export default {
    name: 'personForm',
    mixins: [ApiForm],
    methods: {
        showOk(res) {
            console.log(res)
            alert('Sucessfully saved')
        },
        showErr(err) {
            console.log(err)
            alert(`An error ocurred: ${err}`)
        }
    }
}
</script>
```


## ApiList
### Intro

The ApiList is responsible for implementing a route mandatory prop and the three following methods to load and handle list actions:


### Methods

`loadList(callback, errCallback)`:

- Params: callback, errCallback
- Functionality: It uses $api prototype to do a GET request in the given route and pass the response for the callback function if the response was successfully made, otherwise passes the error to the errCallback function.

`deleteObj(objId, callback, errCallback)`:

- Params: objId, callback, errCallback
- Functionality: It uses $api prototype to do a DELETE request in the given route concatenated with the objIdand passes the response for the callback function if the response was successfully made, then it emits a delete event with the objId.

`editObj(obj)`:

- Params: obj
- Functionality: It just emits an edit event with the given obj in its value.

> Note: You should probably handle the emitted value to pass to a ApiForm instance


### Using it
```vue
<template>
    <ul>
        <li v-for="p in people" :key="p.id">
            {{ p.firstName }} {{ p.lastName }}
        </li>
    </ul>
</template>

<script>
import { ApiList } from 'vue-rest'

export default {
    name: 'peopleList',
    mixins: [ApiList],
    data() {
        return {
            people: [],
        }
    },
    created() {
        this.loadList(this.loadPeople, this.showErr)
    },
    methods: {
        loadPeople(res) {
            console.log(res)
            this.people = [...res.data.results]
        },
        showErr(err) {
            console.log(err)
            alert(`An error ocurred ${err}`)
        }
    }
}

</script>

```