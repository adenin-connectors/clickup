'use strict';

const cfActivity = require('@adenin/cf-activity');
const api = require('./common/api');


module.exports = async function (activity) {

  try {
    api.initialize(activity);

    const response = await api('/team');

    if (!cfActivity.isResponseOk(activity, response)) {
      return;
    }

    // convert response to items[]
    activity.Response.Data = api.convertResponse(response);
  } catch (error) {

    cfActivity.handleError(error, activity);
  }
};