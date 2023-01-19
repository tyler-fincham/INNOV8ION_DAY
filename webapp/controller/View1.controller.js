sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    '../models/formatter',
    "sap/m/MessageBox"
    // "INNOV8ION_DAY/webConsole"
    // "INNOV8ION_DAY/libs/console.js/src/index",
    // "INNOV8ION_DAY/libs/jsconsole/lib/es"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, formatter, MessageBox) {
        "use strict";
        return Controller.extend("INNOV8ION_DAY.webapp.controller.View1", {
            formatter: formatter,
            onInit: function () {

                const oThemeModel = this.getOwnerComponent().getModel("CodeEditorThemes");
                const oViewModel= this.getOwnerComponent().getModel("ViewModel");
                const oOpdrachtenModel = this.getOwnerComponent().getModel("Opdrachten");
                const oRestoreModel = this.getOwnerComponent().getModel("RestoreData");

                this.getView().setModel(oThemeModel, "CodeEditorThemes");
                this.getView().setModel(oViewModel, "ViewModel");
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
                let sValue = oModel.getProperty(sPath).ConsoleArea;


                try {
                    sValue = sValue.replace(/[\r\n]/g, "");
                    let sEval = eval(sValue);
                    if (oModel.getProperty(sPath).source) {
                        // let rRegexp = new RegExp(oModel.getProperty(sPath).regexp);
                        let rRegexp = new RegExp(oModel.getProperty(sPath).source, oModel.getProperty(sPath).flags);
                        if (rRegexp.test(sValue)) {
                            MessageBox.success("Goed gedaan!");
                        } else {
                            MessageBox.error("Helaas probeer opnieuw!");
                        }
                    }
                    oModel.setProperty(`${sPath}/ConsoleArea`, sEval);
                    // this.oCodeEditor.setValue(sEval);

                } catch (err) {
                    MessageBox.error(err.message);

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

            onAntwoord: function (oEvent) {
                const sPath = oEvent.getSource().getBindingContext("OpdrachtenModel").getPath();
                const sAntwoordVal = this.getView().getModel("OpdrachtenModel").getProperty(sPath).antwoord;
                if (sAntwoordVal) {
                    this.getView().getModel("OpdrachtenModel").setProperty(`${sPath}/ConsoleArea`, sAntwoordVal);

                }
            },

            onSelectChange: function (oEvent) {
                const oSelectedItem = oEvent.getParameter("selectedItem");
                const sSelectedKey = oSelectedItem.getKey();
                this.getView().getModel("CodeEditorThemes").setProperty(`/selectedTheme`, sSelectedKey);
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

            onComplete: function(oEvent){
                const sPath = oEvent.getSource().getBindingContext("OpdrachtenModel").getPath();
                const bValidateStep = this.getView().getModel("OpdrachtenModel").getProperty(`${sPath}`).validateStep;

                this.getView().getModel("OpdrachtenModel").setProperty(`${sPath}/validateStep`, true);
            }



        });
    });
