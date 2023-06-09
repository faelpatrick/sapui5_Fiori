sap.ui.require(['sap/ui/core/UIComponent'], function (UIComponent) {
  "use strict";

  return UIComponent.extend("my.app.Component", {
    metadata: {
      "interfaces": ["sap.ui.core.IAsyncContentCreation"],
      "rootView": {
        "viewName": "my.app.view.MainPage",
        "type": "XML",
        "id": "app"
      }
    }
  });
});
