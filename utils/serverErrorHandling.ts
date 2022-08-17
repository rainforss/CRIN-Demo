export const errorResponse = (errMessage: string) => {
  if (errMessage === "Not Authenticated") {
    return {
      status: 401,
      error: {
        name: "Not Authenticated",
        message: "User is not logged in.",
      },
    };
  }
  if (errMessage === "Server Error") {
    return {
      status: 500,
      error: {
        name: "Server Error",
        message:
          "Internal server error, could not retrieve an access token for Dynamics 365 environment.",
      },
    };
  }
  if (errMessage === "Invalid Query") {
    return {
      status: 400,
      error: {
        name: "Invalid Query",
        message: "Invalid query string, missing member id information.",
      },
    };
  }
  if (errMessage === "D365 Error") {
    return {
      status: 400,
      error: {
        name: "D365 Error",
        message: "Integration error, please contact our IT admin.",
      },
    };
  }

  return {
    status: 500,
    error: {
      name: "Server Error",
      message:
        "Internal server error, please try again later. If error persists, please contact IT administrator.",
    },
  };
};
