import Vue from 'vue';
import VueRest from '../../../index.js';
import moxios from 'moxios';

import ApiList from '../../../mixins/ApiList';

describe('Testing ApiList mixin', () => {

  Vue.use(VueRest);
  Vue.mixin(ApiList);

  beforeEach(() => {
    moxios.install(Vue.api);
  });

  afterEach(() => {
    moxios.uninstall(Vue.api);
  });

  const comp = new Vue({
    render: () => {},
    propsData: {
      route: '/food',
    },
  }).$mount();

  const objs = [
    {
      id: 1,
      food: 'Pizza',
      flavor: 'Banana n Chocolate',
    },
    {
      id: 2,
      food: 'Cupcake',
      flavor: 'Vanilla and Chocolate Frost',
    },
  ];

  comp.route = '/foods';

  test('Should load a list', (done) => {
    let arr = [];

    comp.loadList((res) => { arr = res.data }, () => {});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: [
          ...objs,
        ],
      }).then(() => {
        expect(arr).toEqual(objs);
        done();
      });
    });
  });

  test('Should trigger error callback', (done) => {
    const errorMsg = 'Error: Request failed with status code 404';

    let error = '';
    comp.loadList(() => {}, (err) => { error = err.toString() });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 404,
      }).then(() => {
        expect(error).toBe(errorMsg);
        done();
      });
    });
  });

  test('Should delete successfully', (done) => {
    let res = null;

    comp.deleteObj(1, (response) => { res = response }, () => {});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: {
          msg: 'Deleted',
        },
      }).then(() => {
        expect(res.data.msg).toBe('Deleted');
        expect(res.config.url).toBe(`${comp.route}/1/`);
        done();
      });
    });
  });

  test('Should trigger error callback in delete', (done) => {
    const errorMsg = 'Error: Request failed with status code 404';

    let res = null;

    comp.deleteObj(999, () => {}, (err) => { res = err.toString() });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 404,
      }).then(() => {
        expect(res).toBe(errorMsg);
        done();
      });
    });
  });

  test('Should emit an delete event with the object', () => {
    const spyEmit = jest.spyOn(comp, '$emit');
    comp.editObj(objs[0]);
    expect(spyEmit).toHaveBeenCalled();
    spyEmit.mockClear();
  });
});
