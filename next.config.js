const env =
  process.env.NODE_ENV !== "production"
    ? {
      MONGO_URI: "mongodb://127.0.0.1:27017/terraforming-mars",
      }
    : { MONGO_URI: process.env.MONGO_URI };

module.exports = {
  env: env,
};
