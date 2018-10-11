import Vue from 'vue';
import VueRest from '../../../index.js';

describe('Testing install function', () => {
  const interceptor1 = [config => config, error => Promise.reject(error)];
  const interceptor2 = [request => request, error => Promise.reject(error)];
  const interceptor3 = {
    fulfilled: config => config,
    rejected: error => Promise.reject(error),
  };
  const interceptor1AsObj = {
    fulfilled: interceptor1[0],
    rejected: interceptor1[1],
  };

  Vue.use(VueRest, {
    axiosOptions: {
      baseURL: 'http://localhost:8000',
    },
    interceptors: {
      requests: [interceptor1, interceptor2, interceptor3],
      responses: [interceptor3],
    },
  });

  test('Should apply axios settings when axiosOptions is set', () => {
    expect(Vue.api.defaults.baseURL).toBe('http://localhost:8000');
  });

  test('can receive interceptors from axiosOptions', () => {
    expect(Vue.api.interceptors.request.handlers).toEqual(
      expect.arrayContaining([interceptor1AsObj, interceptor3]),
    );
    expect(Vue.api.interceptors.response.handlers).toEqual(
      expect.arrayContaining([interceptor3]),
    );
  });
});
