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
    obj: {
      type: Object,
      required: false,
      default: () => null,
    },
    loadErrCb: {
      type: Function,
      required: false,
      defaut: (err) => {},
    },
  },
  data() {
    return {
      requestObj: {},
    };
  },
  mounted() {
    if (this.obj) {
      this.requestObj = this.obj;
    }
    if (this.objId) {
      this.load(this.objId, this.loadErrCb);
    }
  },
  methods: {
    create(saveCallback = (response) => {}, errCallback = (err) => {}) {
      this.$api.post(this.route, this.requestObj).then((response) => {
        saveCallback(response);
      }).catch((err) => {
        errCallback(err);
      });
    },
    update(saveCallback = (response) => {}, errCallback = (err) => {}) {
      this.$api.patch(`${this.route}/${this.requestObj.id}/`, this.requestObj).then((response) => {
        saveCallback(response);
      }).catch((err) => {
        errCallback(err);
      });
    },
    save(saveCallback = (response) => {}, errCallback = (err) => {}) {
      if (this.requestObj.id) {
        this.update(saveCallback, errCallback);
      } else {
        this.create(saveCallback, errCallback);
      }
    },
    load(id, errCallback = (err) => {}) {
      if (id) {
        this.$api.get(`${this.route}/${id}/`).then((response) => {
          this.requestObj = response.data;
        }).catch((err) => {
          errCallback(err);
        });
      }
    },
  },
};
