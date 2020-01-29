sap.ui.define([
    "manage/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("manage.controller.Main", {

        onInit: function () {
//        	BaseController.prototype.onInit.call(this);
        },
    
        onLinkPress: function (oEvent) {
            var sRoute;
        	switch(this.getView().byId(oEvent.getSource().getId())) {
                case "personLink":
                    sRoute = "PersonSplit"
                    break;
                case "lectorLink":
                    break;
                case "studentLink":
                    break;
                case "seriesLink":
                    break;
                case "studyLink":
                    break;
                default:
                    return;
            }
            BaseController.prototype.navTo(sRoute).call(this);
        }

    });
});