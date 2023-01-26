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
        return Controller.extend("INNOV8ION_DAY.controller.View1", {
            formatter: formatter,
            onInit: function () {
                this.getView().byId("mainWizardId").addStep = function (oWizardStep) {

                    oWizardStep.setWizardContext({ bParentAllowsButtonShow: this.getShowNextButton() });
                    this._incrementStepCount();

                    return this.addAggregation("steps", oWizardStep);
                };
                const oThemeModel = this.getOwnerComponent().getModel("CodeEditorThemes");
                const oViewModel = this.getOwnerComponent().getModel("ViewModel");
                const oOpdrachtenModel = this.getOwnerComponent().getModel("Opdrachten");
                const oRestoreModel = this.getOwnerComponent().getModel("RestoreData");

                this.getView().setModel(oThemeModel, "CodeEditorThemes");
                this.getView().setModel(oViewModel, "ViewModel");
                this.getView().setModel(oOpdrachtenModel, "OpdrachtenModel");
                this.getView().setModel(oRestoreModel, "RestoreData");

                var that = this;
                jQuery(document).on("keydown", function(e) {
                    if (e.metaKey && e.shiftKey && e.keyCode === 83) {
                        that.handleCommandShiftS();
                    }
                });

            },
            onAfterRendering: async function () {
                // //development only code
                // const aWiz = this.getView().byId("mainWizardId");
                // const aWizSteps = this.getView().byId("mainWizardId").getSteps();
                // // aWiz.goToStep(aWizSteps[aWizSteps.length - 1]);

                // const q = function(){
                //     aWizSteps.map(function (step) {
                //         step.setValidated(true);
                //         step._activate();                      
                //     });
                // } 

                // await q();
                // aWiz.goToStep(aWizSteps[aWizSteps.length - 1]);


                // this.oCodeEditor.addCustomCompleter({
                //     getCompletions: function (callback, context) {
                //         callback(null, [{
                //             name: "map",
                //             value: "map",
                //             score: "1",
                //             meta: "Array Method"
                //         }, {
                //             name: "reduce",
                //             value: "reduce",
                //             score: "1",
                //             meta: "Array Method"
                //             // name is not displayed on the screen
                //         }, {
                //             // name is not displayed on the screen
                //             name: "filter",
                //             // value is displayed on the screen
                //             value: "filter",
                //             // score determines which suggestion goes first
                //             score: "2",
                //             // meta is short info displayed on the right of value
                //             meta: "Array Method"
                //         }])
                //     }
                // });
                // console.log(this.oOpdrachtArea)
                // const oDomref = this.oOpdrachtArea.getDomRef();
            },

            //Buttons
            onRun: function (oEvent) {
                const oModel = oEvent.getSource().getModel("OpdrachtenModel");
                const sPath = oEvent.getSource().getBindingContext("OpdrachtenModel").getPath();
                let sValue = oModel.getProperty(sPath).ConsoleArea;
                try {
                    sValue = sValue.replace(/\/\/.*[\r\n]/g, "");
                    let sEval = eval(sValue);
                    if (oModel.getProperty(sPath).source) {
                        // let rRegexp = new RegExp(oModel.getProperty(sPath).regexp);
                        let rRegexp = new RegExp(oModel.getProperty(sPath).source, oModel.getProperty(sPath).flags);
                        if (rRegexp.test(sValue)) {
                            MessageBox.success("Goed gedaan!");
                            oModel.setProperty(`${sPath}/isValidated`, true);
                        } else {
                            MessageBox.error("Helaas probeer opnieuw!");
                        }
                    }
                    if (typeof sEval === 'object') {
                        sEval = JSON.stringify(sEval, null, 4);
                    }
                    oModel.setProperty(`${sPath}/ConsoleArea`, sEval);



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
                // debugger
                // const sPath = oEvent.getSource().getBindingContext("OpdrachtenModel").getPath();
                // const oModel = this.getView().getModel("OpdrachtenModel");
                // const oViewModel = this.getView().getModel("ViewModel");
                // const sType = oModel.getProperty(`${sPath}`).Type;
                // const oAntwoordBtn = oEvent.getSource().getContent()[3];

                // const fnMyTimeout = function (oViewModel) {
                // oViewModel.setProperty("/toonAntwoord", true);
                // };

                // if (sType === "Theorie") {
                //     oEvent.getSource().setValidated(true);
                //     // oAntwoordBtn.setVisible(false);

                //     // setTimeout(fnMyTimeout(oViewModel), 300000);
                //     // setTimeout(fnMyTimeout(oViewModel), 200);
                //     this.getView().getModel("ViewModel").setProperty("/validateStep", false);
                // }


            },

            handleCommandShiftS: function() {
                sap.ui.getCore().byId(this.getView().byId("mainWizardId").getCurrentStep()).setValidated(true);
            },

            onActivate: function (oEvent) {
                const sPath = oEvent.getSource().getBindingContext("OpdrachtenModel").getPath();
                const oModel = this.getView().getModel("OpdrachtenModel");
                const oViewModel = this.getView().getModel("ViewModel");
                const sType = oModel.getProperty(`${sPath}`).Type;
                const oAntwoordBtn = oEvent.getSource().getContent()[3];
                // debugger


                if (oModel.getProperty(sPath).Type === "Oefening") {

                    setTimeout(() => {
                        oModel.setProperty(`${sPath}/showAnswer`, true);
                    }, 600000);
                }
            }

            // onNext: function (oEvent) {
            //     this.getView().byId("mainWizardId").nextStep();
            // }

        });
    });
