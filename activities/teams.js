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

    activity.Response.Data = api.convertResponse(response);
  } catch (error) {
    cfActivity.handleError(activity, error);
  }
};

//**maps response data */
api.convertResponse = function (response) {
  let items = [];
  let teams = response.body.teams;

  for (let i = 0; i < teams.length; i++) {
    let raw = teams[i];
    let item = { id: raw.id, title: raw.name, description: raw.name, link: `https://app.clickup.com/${raw.id}`, raw: raw }
    items.push(item);
  }

  return { items: items };
}