sap.ui.define(["sap/ui/core/UIComponent"],function(t){return t.extend("INNOV8ION_DAY.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments);this.getRouter().initialize();const e=this.getModel("Opdrachten");e.attachRequestCompleted(function(t){const e=t.getSource().getData();this.getModel("RestoreData").setData(e)}.bind(this))}})});