sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Pdf: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            this.showSideContent("GeneratedFacet1");
            console.log(this);
        }
    };
});
