module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.DATABASE_URL || "",
  apiPATH: "api",
  apiVersion: "v1",
  jwtSecretKey: process.env.JWT_SECRET_KEY || "someKey"
};
