import axios from 'axios';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { browser } from '$app/environment';
import { getContext } from 'svelte';
import { goto } from '$app/navigation';
import DialogDelegate, { DialogType } from './components/dialog/snackBar';

class ApiInstance {
  static instance = axios.create({
    baseURL: PUBLIC_BACKEND_URL ?? 'http://localhost:3000'
  });

  /** @type {boolean} */
  static unAuthorized = false;

  constructor() {
    if (!browser) return;
    const accessToken = localStorage.getItem('accessToken');
    ApiInstance.instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    ApiInstance.instance.defaults.headers.common['Access-Control-Allow-Credentials'] = `true`;
    ApiInstance.instance.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
    ApiInstance.instance.defaults.headers.common['ngrok-skip-browser-warning'] = "true";
    ApiInstance.instance.interceptors.request.use((config) => {
      return config;
    });
    ApiInstance.instance.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (!error.response) return Promise.reject(error);
      if ((error.response.status === 403 || error.response.status === 401) && !error.config.url.endsWith('/auth')) {
        if (ApiInstance.unAuthorized) return Promise.reject(error);
        DialogDelegate.show(DialogType.warning, 'Error', 'You are not authorized to perform this action. Please login again.');
        ApiInstance.unAuthorized = true;
        localStorage.removeItem('accessToken');
        goto('/login');
        return Promise.reject(error);
      } else if (error.response.status >= 500) {
        DialogDelegate.show(DialogType.error, 'Error', 'An error occurred while processing your request. Please try again later.')
        return Promise.reject(error);
      } else if (error.response.status >= 400 && !error.config.url.endsWith('/auth')) {
        DialogDelegate.show(DialogType.error, 'Error', error.response.data.message);
        return Promise.reject(error);
      }
      return Promise.reject(error);
    })
  }

  /**
   * @template T
   * @param {string} url 
   * @param {any} [config] 
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
   * @param {any} [config] 
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
   * @param {any} [config] 
   * @returns {Promise<T>} 
   */
  patch(url, data, config) {
    if (!browser) return Promise.reject('Not in browser');
    return ApiInstance.instance.patch(url, data, config);
  }

  /**
   * @template T
   * @param {string} url
   * @param {any} data
   * @param {any} [config]
   * @returns {Promise<T>}
   */
  put(url, data, config) {
    if (!browser) return Promise.reject('Not in browser');
    return ApiInstance.instance.put(url, data, config);
  }
}

export const api = new ApiInstance();