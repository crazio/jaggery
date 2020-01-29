sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("manage.controller.BaseController", {
    	
    	getOwnerModel: function (sModel) {
            return this.getOwnerComponent().getModel(sModel);
        },

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        navTo: function (sRoute, oParams = {}, bHistory = true) {
            this.getRouter().navTo(sRoute, oParams, bHistory);
        },

        navBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("main", {}, true);
			}
        }
    
    });
});