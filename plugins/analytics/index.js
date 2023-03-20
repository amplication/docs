module.exports = function () {
  return {
    name: "docusaurus-plugin-analytics",
    getClientModules() {
      return ["./analytics"];
    },
  };
};
