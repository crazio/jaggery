sap.ui.define([
    "customize/controller/Base"
], function (BaseController) {
    "use strict";

    return BaseController.extend("customize.controller.Main", {

        onInit: function () {
            this.getOwnerModel("asas");
        }

    });
});