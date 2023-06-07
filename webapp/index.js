sap.ui.define(["sap/ui/core/ComponentContainer"], function (ComponentContainer) {
  "use strict";

  new ComponentContainer({
    name: "my.app",
    settings: {
      id: "demo",
    },
    async: true,
  }).placeAt("content");
});
