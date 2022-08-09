const contentfulManagement = require("contentful-management");
const settings = require("./contentful-typegen.json");

//Used to generate contentful model types, see package.json file for type generation script - npm run gen
module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: settings.accesstoken,
  });

  return contentfulClient
    .getSpace(settings.spaceid)
    .then((space) => space.getEnvironment(settings.environment));
};
