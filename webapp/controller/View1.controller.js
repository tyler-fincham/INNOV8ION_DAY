sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    '../models/formatter',
    // "INNOV8ION_DAY/webConsole"
    // "INNOV8ION_DAY/libs/console.js/src/index",
    // "INNOV8ION_DAY/libs/jsconsole/lib/es"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, formatter) {
        "use strict";
        return Controller.extend("INNOV8ION_DAY.webapp.controller.View1", {
            formatter: formatter,
            onInit: function () {

                const oThemeModel = this.getOwnerComponent().getModel("CodeEditorThemes");

                const oOpdrachtenModel = this.getOwnerComponent().getModel("Opdrachten");
                const oRestoreModel = this.getOwnerComponent().getModel("RestoreData");

                this.getView().setModel(oThemeModel, "CodeEditorThemes");
                this.getView().setModel(oOpdrachtenModel, "OpdrachtenModel");
                this.getView().setModel(oRestoreModel, "RestoreData");

                this.oCodeEditor = this.getView().byId("codeEditorId");
                this.oOpdrachtArea = this.getView().byId("textAreaId");


            },

            onAfterRendering: function () {
                this.oCodeEditor.addCustomCompleter({
                    getCompletions: function (callback, context) {
                        callback(null, [{
                            name: "map",
                            value: "map",
                            score: "1",
                            meta: "Array Method"
                        }, {
                            name: "reduce",
                            value: "reduce",
                            score: "1",
                            meta: "Array Method"
                            // name is not displayed on the screen
                        }, {
                            // name is not displayed on the screen
                            name: "filter",
                            // value is displayed on the screen
                            value: "filter",
                            // score determines which suggestion goes first
                            score: "2",
                            // meta is short info displayed on the right of value
                            meta: "Array Method"
                        }])
                    }
                });
                // console.log(this.oOpdrachtArea)
                // const oDomref = this.oOpdrachtArea.getDomRef();
            },

            //Buttons
            onRun: function (oEvent) {
                const oModel = oEvent.getSource().getModel("OpdrachtenModel");
                const sPath = oEvent.getSource().getBindingContext("OpdrachtenModel").getPath();

                // this.oCodeEditor.fireLiveChange();
                let sValue = oModel.getProperty(sPath).ConsoleArea
                sValue = sValue.replace(/[\r\n]/g, "");
                try {

                    let sEval = eval(sValue);
                    oModel.setProperty(`${sPath}/ConsoleArea`, sEval);
                    // this.oCodeEditor.setValue(sEval);

                } catch (err) {
                    alert(err)

                }


            },

            onClear: function (oEvent) {
                oEvent.getSource().getModel("OpdrachtenModel").setProperty(oEvent.getSource().getBindingContext("OpdrachtenModel").getPath() + "/ConsoleArea", "");
                // this.oCodeEditor.setValue("");
            },

            onReset: function (oEvent) {
                const sPath = oEvent.getSource().getBindingContext("OpdrachtenModel").getPath();
                const sOriginalVal = this.getView().getModel("RestoreData").getProperty(sPath).ConsoleArea;
                this.getView().getModel("OpdrachtenModel").setProperty(`${sPath}/ConsoleArea`, sOriginalVal);

            },

            onSelectChange: function (oEvent) {
                const oSelectedItem = oEvent.getParameter("selectedItem");
                const sSelectedKey = oSelectedItem.getKey();
                this.oCodeEditor.setColorTheme(sSelectedKey);
            },
            onStepActivate: function (oEvent) {
                // this.oOpdrachtArea = oEvent.getSource().getParent().getContent()[0].getItems()[0];
                // this.oCodeEditor = oEvent.getSource().getParent().getContent()[0].getItems()[1];
                // debugger

            },

            onNavChnge: function (oEvent) {
                // debugger
                this.oOpdrachtArea = oEvent.getParameters().step.getContent()[0].getItems()[0];
                this.oCodeEditor = oEvent.getParameters().step.getContent()[0].getItems()[1];
            },



        });
    });
