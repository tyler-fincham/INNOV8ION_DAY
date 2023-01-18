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
                this.getView().setModel(oThemeModel, "CodeEditorThemes");
                // this.oCodeEditor = this.getView().byId("aCodeEditor");

                // this.oOpdrachtArea = this.getView().byId("opdrachtAreaId");


            },

            onAfterRendering: function () {
                this.oOpdrachtArea = this.getView().byId("mainWizardId")._getCurrentStepInstance().getContent()[0].getItems()[0]
                this.oCodeEditor = this.getView().byId("mainWizardId")._getCurrentStepInstance().getContent()[0].getItems()[1]
                this.oCodeEditor.addCustomCompleter({
                    getCompletions: function (callback, context) {
                        // callback is provided to us by ACE so we can execute it as shown
                        // below in order to display suggestions to the user
                        // ideally, the array argument, provided to the following method call
                        // will be dynamically generated based on the content of the context
                        // object
                        // let's assume the context contains an sPrefix equal to 'read', which
                        // means the cursor in ACE is at the end of a 'read' word
                        // by executing the following call, we can show a list of suggestions
                        // such as: readFile, readStream, readResponse 
                        callback(null, [{
                            name: "map",
                            value: "map",
                            score: "1",
                            meta: "Array Method"
                            // meta is short info displayed on the right of value						meta: "function"
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
            onRun: function (oEvent) {
                this.oOpdrachtArea = oEvent.getSource().getParent().getContent()[0].getItems()[0];
                this.oCodeEditor = oEvent.getSource().getParent().getContent()[0].getItems()[1];
                this.oCodeEditor.fireLiveChange();
                let sValue = this.oCodeEditor.getValue()
                sValue = sValue.replace(/[\r\n]/g, "");
                try {

                    let sEval = eval(sValue);
                    this.oCodeEditor.setValue(sEval);
                } catch (err) {
                    alert(err)

                }


            },

            onClear: function (oEvent) {
                this.oCodeEditor = oEvent.getSource().getParent().getContent()[0].getItems()[1];
                this.oCodeEditor.setValue("");
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

            onNavChnge: function(oEvent){
                // debugger
                this.oOpdrachtArea = oEvent.getParameters().step.getContent()[0].getItems()[0];
                this.oCodeEditor = oEvent.getParameters().step.getContent()[0].getItems()[1];
            }


        });
    });
