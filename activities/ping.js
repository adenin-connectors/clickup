'use strict';
const api = require('./common/api');

module.exports = async (activity) => {
  try {
    const response = await api('/user');

    activity.Response.Data = {
      success: response && response.statusCode === 200
    };
  } catch (error) {
    Activity.handleError(error);
    activity.Response.Data.success = false;
  }
};
