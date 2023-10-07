import axios from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { browser } from '$app/environment';
import { getContext } from 'svelte';

class ApiInstance {
  static instance = axios.create({
    baseURL: PUBLIC_BACKEND_URL ?? 'http://localhost:3000'
  });

  constructor() {
    if (!browser) return;
    const accessToken = localStorage.getItem('accessToken');
    ApiInstance.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    ApiInstance.instance.interceptors.request.use((config) => {
      return config;
    });
  }

  /**
   * @template T
   * @param {string} url 
   * @param {any} config 
   * @returns {Promise<T>}
   */
  get(url, config) {
    if (!browser) return Promise.reject('Not in browser');
    return ApiInstance.instance.get(url, config);
  }

  /**
   * @template T
   * @param {string} url 
   * @param {any} data 
   * @param {any} config 
   * @returns {Promise<T>}
   */
  post(url, data, config) {
    if (!browser) return Promise.reject('Not in browser');
    return ApiInstance.instance.post(url, data, config);
  }

  /**
   * @template T
   * @param {string} url 
   * @param {any} data 
   * @param {any} config 
   * @returns {Promise<T>} 
   */
  patch(url, data, config) {
    if (!browser) return Promise.reject('Not in browser');
    return ApiInstance.instance.patch(url, data, config);
  }
}

export const api = new ApiInstance();