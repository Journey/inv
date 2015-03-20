sap.ui.controller("sap.mtk.poc.IGA.view.Main", {

    onInit : function() {
        if (sap.ui.Device.support.touch === false) {
            this.getView().addStyleClass("sapUiSizeCompact");
        }
        
        this._oComponent = this.getOwnerComponent();
        
        //this.getView().setModel(this._oComponent.getModel(), "odata");
    }
});
