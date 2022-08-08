const contentfulManagement = require("contentful-management");
const settings = require("./contentful-typegen.json");

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: settings.accesstoken,
  });

  return contentfulClient
    .getSpace(settings.spaceid)
    .then((space) => space.getEnvironment("master"));
};
