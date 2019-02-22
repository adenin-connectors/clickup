const api = require('./common/api');


module.exports = async function (activity) {

  try {

    api.initialize(activity);

    const response = await api('/team');

    // convert response to items[]
    activity.Response.Data = api.convertResponse(response);

  } catch (error) {

    // return error response
    var m = error.message;
    if (error.stack) m = m + ": " + error.stack;

    activity.Response.ErrorCode = (error.response && error.response.statusCode) || 500;
    activity.Response.Data = { ErrorText: m };

  }

};