'use strict';
const api = require('./common/api');

module.exports = async function (activity) {

  try {
    const response = await api('/team');

    if (Activity.isErrorResponse(response)) return;

    activity.Response.Data = convertResponse(response);
  } catch (error) {
    Activity.handleError(error);
  }
};

//**maps response data */
function convertResponse(response) {
  let items = [];
  let teams = response.body.teams;

  for (let i = 0; i < teams.length; i++) {
    let raw = teams[i];
    let item = { id: raw.id, title: raw.name, description: raw.name, link: `https://app.clickup.com/${raw.id}`, raw: raw }
    items.push(item);
  }

  return { items: items };
}