import Vue from 'vue';
import VueRest from '../../../index.js';
import moxios from 'moxios';

import ApiForm from '../../../mixins/ApiForm';

describe('Testing ApiForm mixin', () => {

  Vue.use(VueRest);
  Vue.mixin(ApiForm);

  beforeEach(() => {
    moxios.install(Vue.api);
  });

  afterEach(() => {
    moxios.uninstall(Vue.api);
  });

  const newFood = {
    food: 'Sushi',
    flavor: 'Tuna hosomaki',
  };

  const comp = new Vue({
    render: () => {},
    propsData: {
      route: '/foods',
      obj: newFood,
    },
  }).$mount();

  test('Should set requestObj as obj prop', () => {
    expect(comp.requestObj).toBe(newFood);
  });

  test('Should register a new object', (done) => {
    comp.save((response) => comp.requestObj = response.data);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      const responseObj = { ...newFood, id: 1 };

      request.respondWith({
        status: 201,
        response: {
          responseObj,
        },
      }).then((response) => {
        expect(comp.requestObj).toBe(response.data);
        done();
      });
    });
  });

  test('Should call errCallback on save new obj', (done) => {
    const errorMsg = 'Error: Request failed with status code 403';
    let error = '';

    comp.save((response) => {}, (err) => error = err.toString());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 403,
      }).then((response) => {
        expect(error).toBe(errorMsg);
        done();
      });
    });
  });
    

  test('Should update an object', (done) => {
    Object.assign(comp.requestObj, { id: 1 });
    comp.save((response) => comp.requestObj = response.data);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      const responseObj = { food: 'Sushi', flavor: 'Salmon nigiri', id: 1 };

      request.respondWith({
        status: 200,
        response: {
          responseObj,
        },
      }).then((response) => {
        expect(comp.requestObj).toBe(response.data);
        done();
      });
    });
  });

  test('Should call errCallback on save new obj', (done) => {
    Object.assign(comp.requestObj, { id: 1 });
    const errorMsg = 'Error: Request failed with status code 403';
    let error = '';

    comp.save((response) => {}, (err) => error = err.toString());

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 403,
      }).then((response) => {
        expect(error).toBe(errorMsg);
        done();
      });
    });
  });


  let comp2Err = '';
  const comp2 = new Vue({
    render: () => {},
    propsData: {
      route: '/foods',
      objId: 1,
      loadErrCb: (err) => comp2Err = err.toString(),
    },
  });

  test('Should load succesfully an obj', (done) => {
    comp2.$mount();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      const responseObj = { food: 'Sushi', flavor: 'Salmon skin roll' , id: 1 };

      request.respondWith({
        status: 200,
        response: {
          responseObj,
        },
      }).then((response) => {
        expect(comp2.requestObj).toBe(response.data);
        done();
      });
    });
  });

  test('Should load succesfully an obj', (done) => {
    comp2.$mount();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      const errorMsg = 'Error: Request failed with status code 403';

      request.respondWith({
        status: 403,
      }).then((response) => {
        expect(comp2Err).toBe(errorMsg);
        done();
      });
    });
  });
});

