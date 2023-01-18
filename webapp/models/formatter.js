sap.ui.define([
    "sap/ui/core/IconPool"
], function (IconPool) {
    "use strict";
    return {
        getRandomIcon: function () {
            var aIcons = IconPool.getIconNames();
            var iRandom = Math.floor(Math.random() * aIcons.length);
            return IconPool.getIconURI(aIcons[iRandom])
            // return aIcons[iRandom];
        }
    };
});