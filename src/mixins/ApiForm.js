/* eslint-disable no-unused-vars */
export default {
  props: {
    route: {
      type: String,
      required: true,
    },
    objId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      restObj: {},
    };
  },
  methods: {
    create(createCallback = (response) => {}, errCallback = (err) => {}) {
      this.$api.post(this.route, this.requestObj).then((response) => {
        createCallback(response);
      }).catch((err) => {
        errCallback(err);
      });
    },
    update(createCallback = (response) => {}, errCallback = (err) => {}) {
      this.$api.patch(this.route, this.requestObj).then((response) => {
        createCallback(response);
      }).catch((err) => {
        errCallback(err);
      });
    },
    save(createCallback = (response) => {}, errCallback = (err) => {}) {
      if (this.requestObj.id) {
        this.update(createCallback, errCallback);
      } else {
        this.create(createCallback, errCallback);
      }
    },
    load(errCallback = (err) => {}) {
      if (this.objId) {
        this.$api.get(`${this.route}/${this.objId}/`).then((response) => {
          this.restObj = response.data;
        }).catch((err) => {
          errCallback(err);
        });
      }
    },
  },
};
