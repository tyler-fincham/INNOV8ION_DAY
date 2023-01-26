sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","../models/formatter","sap/m/MessageBox"],function(Controller,JSONModel,formatter,MessageBox){"use strict";return Controller.extend("INNOV8ION_DAY.controller.View1",{formatter:formatter,onInit:function(){this.getView().byId("mainWizardId").addStep=function(e){e.setWizardContext({bParentAllowsButtonShow:this.getShowNextButton()});this._incrementStepCount();return this.addAggregation("steps",e)};const e=this.getOwnerComponent().getModel("CodeEditorThemes");const t=this.getOwnerComponent().getModel("ViewModel");const o=this.getOwnerComponent().getModel("Opdrachten");const n=this.getOwnerComponent().getModel("RestoreData");this.getView().setModel(e,"CodeEditorThemes");this.getView().setModel(t,"ViewModel");this.getView().setModel(o,"OpdrachtenModel");this.getView().setModel(n,"RestoreData");var r=this;jQuery(document).on("keydown",function(e){if(e.metaKey&&e.shiftKey&&e.keyCode===83){r.handleCommandShiftS()}})},onAfterRendering:async function(){},onRun:function(oEvent){const oModel=oEvent.getSource().getModel("OpdrachtenModel");const sPath=oEvent.getSource().getBindingContext("OpdrachtenModel").getPath();let sValue=oModel.getProperty(sPath).ConsoleArea;try{sValue=sValue.replace(/\/\/.*[\r\n]/g,"");let sEval=eval(sValue);if(oModel.getProperty(sPath).source){let e=new RegExp(oModel.getProperty(sPath).source,oModel.getProperty(sPath).flags);if(e.test(sValue)){MessageBox.success("Goed gedaan!");oModel.setProperty(`${sPath}/isValidated`,true)}else{MessageBox.error("Helaas probeer opnieuw!")}}if(typeof sEval==="object"){sEval=JSON.stringify(sEval,null,4)}oModel.setProperty(`${sPath}/ConsoleArea`,sEval)}catch(e){MessageBox.error(e.message)}},onClear:function(e){e.getSource().getModel("OpdrachtenModel").setProperty(e.getSource().getBindingContext("OpdrachtenModel").getPath()+"/ConsoleArea","")},onReset:function(e){const t=e.getSource().getBindingContext("OpdrachtenModel").getPath();const o=this.getView().getModel("RestoreData").getProperty(t).ConsoleArea;this.getView().getModel("OpdrachtenModel").setProperty(`${t}/ConsoleArea`,o)},onAntwoord:function(e){const t=e.getSource().getBindingContext("OpdrachtenModel").getPath();const o=this.getView().getModel("OpdrachtenModel").getProperty(t).antwoord;if(o){this.getView().getModel("OpdrachtenModel").setProperty(`${t}/ConsoleArea`,o)}},onSelectChange:function(e){const t=e.getParameter("selectedItem");const o=t.getKey();this.getView().getModel("CodeEditorThemes").setProperty(`/selectedTheme`,o)},onStepActivate:function(e){},onNavChnge:function(e){},handleCommandShiftS:function(){sap.ui.getCore().byId(this.getView().byId("mainWizardId").getCurrentStep()).setValidated(true)},onActivate:function(e){const t=e.getSource().getBindingContext("OpdrachtenModel").getPath();const o=this.getView().getModel("OpdrachtenModel");const n=this.getView().getModel("ViewModel");const r=o.getProperty(`${t}`).Type;const s=e.getSource().getContent()[3];if(o.getProperty(t).Type==="Oefening"){setTimeout(()=>{o.setProperty(`${t}/showAnswer`,true)},6e5)}}})});