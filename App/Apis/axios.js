import {create} from 'apisauce';
import Config from 'react-native-config';
import NetInfo from '@react-native-community/netinfo';
import {isHTML} from '../Utils/Validation';
import {ToastBottomHelper} from '../Utils/Utils';
import {PROBLEM_CODE} from '../Configs/Constant';
import {deleteData, getData, storeData} from '../Utils/Storage';

console.log('22222222222', Config.API_ROOT);

const API_ROOT = 'http://10.0.2.2:8000/api';
const api = create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

const parseErrorResponse = async error => {
  let message;
  let data = {};
  if (error.data instanceof Array) {
    message = error.data[0];
  } else if (error.data instanceof Object) {
    data = error.data;
    const firstKey = Object.keys(error.data)[0];
    message = error.data[firstKey];

    if (message instanceof Array) {
      message = message[0];
    }
    if (message?.message) {
      message = message.message;
    }
  } else {
    message = error.data || error.problem;
  }

  if (typeof message === 'string') {
    let hideError = false;
    if (message === 'Network Error') {
      const netState = await NetInfo.fetch();
      if (!netState.isConnected) {
        hideError = true;
      }
    }
    if (!hideError) {
      switch (error.problem) {
        case PROBLEM_CODE.SERVER_ERROR:
          message = 'server_error';
          break;
        case PROBLEM_CODE.CLIENT_ERROR:
          if (error.status === 404 && isHTML(error.data)) {
            message = 'not_found';
          }
          break;
      }
      ToastBottomHelper.error(message);
    }
  }

  return {
    success: false,
    error,
    message,
    data,
    resp_status: error?.status || error?.response?.status,
  };
};

export async function axiosCache(URL) {
  const cacheKey = `@CACHE_REQUEST_${URL}`;
  const cachedData = await getData(cacheKey);
  if (!cachedData) {
    return null;
  }

  return {
    success: true,
    data: JSON.parse(cachedData),
    cache: true,
  };
}

export async function fetchWithCache(url, config = {}, updateMethod) {
  const cacheResponse = await axiosCache(url);
  try {
    if (cacheResponse) {
      updateMethod(cacheResponse);
    }
  } catch {}
  const response = await axiosGet(url, config, true);
  if (!response.cache) {
    updateMethod(response);
  }
}

export async function axiosGet(URL, config = {}, cache = false) {
  const cacheKey = `@CACHE_REQUEST_${URL}`;
  let response;
  try {
    response = await api.get(URL, config?.params, config);
  } catch (error) {
    if (cache) {
      // only network error or server error
      if (!error.response || error.response.status >= 500) {
        return (await axiosCache(URL)) || parseErrorResponse(error);
      } else {
        deleteData(cacheKey);
      }
    }
    return parseErrorResponse(error);
  }

  const {data, problem} = response;
  if (response.status === 200) {
    if (cache) {
      storeData(cacheKey, JSON.stringify(data));
    }
    return {
      success: true,
      data,
    };
  }
  if (problem) {
    if (cache) {
      return (
        (await axiosCache(URL, 500)) || (await parseErrorResponse(response))
      );
    }
    return await parseErrorResponse(response);
  }
  return {
    success: false,
    resp_status: response.status,
    data,
  };
}

async function axiosCall(method, ...args) {
  let response;
  try {
    response = await api[method](...args);
    if (response.status >= 400) {
      return parseErrorResponse(response);
    }
  } catch (error) {
    return parseErrorResponse(error);
  }

  const {data, problem} = response;
  if (response.status >= 200 && response.status < 300) {
    return {
      success: true,
      data,
    };
  }

  if (problem) {
    return await parseErrorResponse(response);
  }

  return {
    success: false,
    resp_status: response.status,
    data,
  };
}

export async function axiosPost(...options) {
  return await axiosCall('post', ...options);
}

export async function axiosPut(...options) {
  return await axiosCall('put', ...options);
}

export async function axiosPatch(...options) {
  return await axiosCall('patch', ...options);
}

export async function axiosDelete(...options) {
  return await axiosCall('delete', ...options);
}

export default api;

const convertFilenameImage = filename => {
  const filenameConverted = filename?.replace(/HEIC/g, 'jpg');
  return filenameConverted || filename;
};
export function createFormData(data, list_file_field) {
  const formData = new FormData();

  Object.keys(data).forEach(key => {
    const item = data[key];

    if (list_file_field.includes(key)) {
      if (!item) {
        // if file field is falsy, so we ignore
        return;
      }

      formData.append(key, {
        name: convertFilenameImage(
          item.filename || item.path?.split('/').pop(),
        ),
        type: item.mime,
        uri: item.path,
      });
      return;
    }

    formData.append(key, data[key]);
  });
}
