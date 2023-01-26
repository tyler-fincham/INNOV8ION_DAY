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
        },

        getAntwoordButton: function (param1, param2) {
            if (param2 === "Oefening") {
                // debugger
                setTimeout(() => {
                    return true;
                }, 200);
            } else {
                return false
            }

        }
    };
});