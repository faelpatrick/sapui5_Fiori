sap.ui.require(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
  ],
  function (
    Controller,
    MessageToast,
    JSONModel,
    Filter,
    FilterOperator,
    Sorter
  ) {
    "use strict";

    var iPageSize = 3;
    var iCurrentPage = 1;
    var oModel;

    return Controller.extend("my.app.controller.MainPage", {
      onInit: function () {
        oModel = new JSONModel();
        oModel.loadData("products.json");
        oModel.setSizeLimit(iPageSize);
        this.getView().setModel(oModel);
        this.updatePageData();
      },

      updatePageData: function () {
        var oTable = this.getView().byId("productTable");
        var oBinding = oTable.getBinding("items");

        var iStartIndex = (iCurrentPage - 1) * iPageSize;
        var iEndIndex = iStartIndex + iPageSize;

        oBinding.getContexts(iStartIndex, iEndIndex);
      },

      nextPage: function () {
        var oTable = this.getView().byId("productTable");
        var oBinding = oTable.getBinding("items");
        var iTotalItems = oBinding.getLength();
        var iTotalPages = Math.ceil(iTotalItems / iPageSize);
        if (iCurrentPage < iTotalPages) {
          iCurrentPage++;
          this.updatePageData();
        }
      },

      previousPage: function () {
        if (iCurrentPage > 1) {
          iCurrentPage--;
          this.updatePageData();
        }
      },

      onSearch: function (event) {
        MessageToast.show("Buscando!");
        var searchTerm = event.getParameter("query");
        var oTable = this.getView().byId("productTable");
        var oBinding = oTable.getBinding("items");

        if (searchTerm) {
          var oFilter = new Filter("name", FilterOperator.Contains, searchTerm);
          oBinding.filter([oFilter]);
        } else {
          oBinding.filter([]);
        }

        iCurrentPage = 1; // Reinicia a página para a primeira página após a pesquisa
        this.updatePageData();
      },

      onSort: function (event) {
        event.preventDefault();

        var columnName = event.getSource().getText();
        var oTable = this.getView().byId("productTable");
        var oBinding = oTable.getBinding("items");

        if (columnName) {
          var bDescending = !oBinding.aSorters[0]?.bDescending || false;
          var oSorter = new Sorter(columnName, bDescending);
          oBinding.sort([oSorter]);

          MessageToast.show(
            "Ordenando por: " +
              columnName +
              " (ordem " +
              (bDescending ? "descendente" : "ascendente") +
              ")"
          );
        }
      },
    });
  }
);
