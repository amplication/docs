module.exports = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (
      previousLocation &&
      (location.pathname !== previousLocation.pathname ||
        location.search !== previousLocation.search ||
        location.hash !== previousLocation.hash)
    ) {
      //segment
      window.analytics?.page(location.pathname, { url: location.pathname });
      // hubspot
      window._hsq?.push(["setPath", location.pathname]);
      window._hsq?.push(["trackPageView"]);
    }
  },
};
