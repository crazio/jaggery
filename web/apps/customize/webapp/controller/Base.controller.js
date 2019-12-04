sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("customize.controller.Base", {
        getOwnerModel: function (sModel) {
            return this.getOwnerComponent().getModel(sModel);
        }
    });
});