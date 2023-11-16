module.exports = () => {
  process.removeAllListeners();

  process.on("unhandledRejection", (reason, p) => {
    console.error(reason, p);
  });

  process.on("uncaughtException", (err, origin) => {
    console.error(err, origin);
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.error(err, origin);
  });

  process.on("multipleResolves", () => {});
};