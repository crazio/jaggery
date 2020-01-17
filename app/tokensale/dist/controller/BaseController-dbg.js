sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("tokensale.controller.BaseController", {
        getOwnerModel: function (sModel) {
            return this.getOwnerComponent().getModel(sModel);
        }
    });
});