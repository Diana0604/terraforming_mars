const env =
  process.env.NODE_ENV === "development"
    ? {
        mongoUri: "mongodb://127.0.0.1:27017/terraforming-mars",
      }
    : { mongoUri: process.env.MONGO_URI };

module.exports = {
  env: env,
};
