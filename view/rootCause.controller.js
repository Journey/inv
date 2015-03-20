jQuery.sap.require("sap.ui.core.mvc.Controller");

sap.ui.core.mvc.Controller.extend("sap.mtk.poc.IGA.view.rootCause", {
	
	onInit: function() {
		this._oRouter = this.getOwnerComponent().getRouter();
		this._oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
	},
	_onRoutePatternMatched: function(oEvent){
		if (oEvent.getParameter("name") !== "rootCause") {
			return;
		}

		//this._oRouter.navTo("highlight");
	},

	onTabBarClick: function(oEvent){
		var key = oEvent.getParameter("key");
		var routeName;
		switch(key){
			case "wip":
				routeName="wip";
			break;
			case "fcst":
				routeName="fcst";
			break;
			deault:
				key = ""
				routeName="hight";
			break;
		}

		this._oRouter.navTo(routeName);
	},

	selectTab:function(key){
		this.byId("tabBar").fireSelect(key);
	}
});