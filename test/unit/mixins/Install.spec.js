import Vue from 'vue';
import VueRest from '../../../index.js';

describe('Testing install function', () => {

  Vue.use(VueRest, {
    axiosOptions: {
      baseURL: 'http://localhost:8000',
    },
  });

  test('Should apply axios settings when axiosOptions is set', () => {
    expect(Vue.api.defaults.baseURL).toBe('http://localhost:8000');
  }); 
});
