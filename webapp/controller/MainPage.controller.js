sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/Sorter"],
  function (Controller, MessageToast, JSONModel, Filter, FilterOperator, Sorter) {
    "use strict";

    return Controller.extend("my.app.controller.MainPage", {
      // Método de inicialização do controlador
      onInit: function () {
        // Carregar o modelo de dados
        var oView = this.getView();
        var oModel = new JSONModel();
        oModel.loadData("products.json");
        oView.setModel(oModel);

        // Manipular a conclusão da requisição do modelo
        oModel.attachRequestCompleted(function () {
          // Obter o número total de itens e exibir uma mensagem
          var oBinding = oView.byId("productTable").getBinding("items");
          var iTotalItems = oBinding.getLength();
          MessageToast.show("Total de itens: " + iTotalItems);
          this.iTotalItems = iTotalItems;
          this.applyPagination();
        }, this);

        // Configurações iniciais da paginação
        this.iPageSize = 5;
        this.iCurrentPage = 1;
      },

      // Aplicar a lógica de paginação
      applyPagination: function () {
        var oTable = this.getView().byId("productTable");
        var oBinding = oTable.getBinding("items");
        var iStartIndex = (this.iCurrentPage - 1) * this.iPageSize;
        var iEndIndex = iStartIndex + this.iPageSize;

        // Limpar os filtros existentes
        oBinding.filter([]);

        // Aplicar a filtragem para exibir os itens corretos na página atual
        if (iStartIndex < this.iTotalItems) {
          var aFilters = [];
          iStartIndex != 0 ? iStartIndex++ : (iStartIndex = 0);
          for (var i = iStartIndex; i <= iEndIndex && i <= this.iTotalItems; i++) {
            aFilters.push(new Filter("id", FilterOperator.EQ, i));
          }
          oBinding.filter(aFilters);
        }
      },

      // Avançar para a próxima página
      nextPage: function () {
        var iTotalPages = Math.ceil(this.iTotalItems / this.iPageSize);
        if (this.iCurrentPage < iTotalPages) {
          this.iCurrentPage++;
          this.applyPagination();
        }
      },

      // Voltar para a página anterior
      previousPage: function () {
        if (this.iCurrentPage > 1) {
          this.iCurrentPage--;
          this.applyPagination();
        }
      },

      // Executar a pesquisa de itens
      onSearch: function (event) {
        var oTable = this.getView().byId("productTable");
        var oBinding = oTable.getBinding("items");
        var searchTerm = event.getParameter("query");
        // Aplicar o filtro de pesquisa ou limpar os filtros
        if (searchTerm) {
          var oFilter = new Filter("name", FilterOperator.Contains, searchTerm);
          oBinding.filter([oFilter]);
        } else {
          oBinding.filter([]);
        }

        // Reiniciar a página para a primeira página
        this.iCurrentPage = 1;
        
      },

      // Ordenar a tabela
      onSort: function (event) {
        event.preventDefault();
        var columnName = event.getSource().getText();
        var oTable = this.getView().byId("productTable");
        var oBinding = oTable.getBinding("items");

        // Determinar a ordem de classificação e aplicar a ordenação
        if (columnName) {
          var bDescending = !oBinding.aSorters[0]?.bDescending || false;
          var oSorter = new Sorter(columnName, bDescending);
          oBinding.sort([oSorter]);

          MessageToast.show("Ordenando por: " + columnName + " (ordem " + (bDescending ? "descendente" : "ascendente") + ")");
        }
      },
    });
  }
);
