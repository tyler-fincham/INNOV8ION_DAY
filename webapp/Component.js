sap.ui.define([
    'sap/ui/core/UIComponent'
  ], function (UIComponent) {
    return UIComponent.extend('INNOV8ION_DAY.webapp.Component', {
      metadata: {
        manifest: 'json'
      },
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);
        // enable routing
        this.getRouter().initialize();

        // set the device model
        // this.setModel(models.createDeviceModel(), "device");
    }
    });
  });
  
