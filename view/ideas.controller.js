jQuery.sap.require("sap.ui.core.mvc.Controller");

sap.ui.core.mvc.Controller.extend("sap.mtk.poc.IGA.view.ideas", {
	
	onInit: function() {
		this._oComponent = this.getOwnerComponent();
		this._eventBus = this._oComponent.getEventBus();
		this._oRouter = this._oComponent.getRouter();
		this._oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
	},
	_onRoutePatternMatched: function(oEvent){
		if (oEvent.getParameter("name") !== "ideas") {
			return;
		}

		this._eventBus.publish("root","tabselect",{key:"ideas"});
	}
});