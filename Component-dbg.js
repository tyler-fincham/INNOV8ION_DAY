sap.ui.define([
  'sap/ui/core/UIComponent'
], function (UIComponent) {
  return UIComponent.extend('INNOV8ION_DAY.Component', {
    metadata: {
      manifest: 'json'
    },
    init: function () {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);
      // enable routing
      this.getRouter().initialize();

      const oModel = this.getModel("Opdrachten");
      // const oRestoreModel = this.getModel("RestoreData");

      oModel.attachRequestCompleted(function (oEvent) {
        const data = oEvent.getSource().getData();
        this.getModel("RestoreData").setData(data)
      }.bind(this));

      // set the device model
      // this.setModel(models.createDeviceModel(), "device");
    }
  });
});

