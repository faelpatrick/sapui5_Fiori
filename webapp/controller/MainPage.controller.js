sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("my.app.controller.MainPage", {
    onInit: function () {
      var oModel = new JSONModel();
      oModel.loadData("products.json");
      this.getView().setModel(oModel);
    },
  });
});
