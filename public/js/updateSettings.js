/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const catchAsync = require('../../utils/catchAsync');

export const updateSettings = async (data, type) => {
  try {
    console.log('we go');
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/api/v1/users/${type === 'password' ? 'updateMyPassword' : 'updateMe'}`,
      data,
    });

    if (res.data.status === 'success')
      showAlert('success', `${type.toUpperCase()} updated successfully`);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
