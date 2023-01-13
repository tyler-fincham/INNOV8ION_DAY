sap.ui.define(['sap/m/Text',
    "sap/ui/core/mvc/XMLView"], function (Text, XMLView) {
        XMLView.create({
            viewName: "INNOV8ION_DAY.webapp.view.App"
        }).then(function (oView) {
            oView.placeAt("content");
        });
    });