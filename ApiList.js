/* eslint-disable no-unused-vars */

export default {
  props: {
    route: {
      type: String,
      required: true,
    },
  },
  methods: {
    loadList(callback = (response) => {}, errCallback = (err) => {}) {
      this.$api.get(this.route).then((response) => {
        callback(response);
      }).catch((err) => {
        errCallback(err);
      });
    },
    deleteObj(objId, callback = (response) => {}, errCallback = (err) => {}) {
      this.$api.delete(`${this.route}/${objId}/`).then((response) => {
        callback(response);
        this.$emit('delete', objId);
      }).catch((err) => {
        errCallback(err);
      });
    },
    editObj(obj) {
      this.$emit('edit', obj);
    },
  },
};
