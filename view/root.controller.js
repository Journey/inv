jQuery.sap.require("sap.ui.core.mvc.Controller");

sap.ui.core.mvc.Controller.extend("sap.mtk.poc.IGA.view.root", {
	
	onInit: function() {
		this._oComponent = this.getOwnerComponent();
		this._eventBus = this._oComponent.getEventBus();
		this._oRouter = this._oComponent.getRouter();
		this._oRouter.attachRoutePatternMatched(this._onRoutePatternMatched, this);
		this.getView().setModel(this._oComponent.getModel("odata"), "odata")

		this.oStep1 = this.byId("step1");
		this.oStep2 = this.byId("step2");
		this.oStep3 = this.byId("step3");

		this._eventBus.subscribe("root","tabselect",function(sChannelId,sEventId,oData){
			this.selectTab(oData.key);
		}, this);

		this._eventBus.subscribe("root","open-full",function(sChannelId,sEventId,oContent){
			this.oFullScreenContent = oContent;
			this.byId("fullscreenContainer").addContent(oContent);;
		}, this);
	},

	_onRoutePatternMatched: function(oEvent){
		if (oEvent.getParameter("name") !== "default") {
			return;
		}
		this._oRouter.navTo("rootCause");
	},

	onTabBarSelect: function(oEvent){
		var step = oEvent.getParameter("key");
		var routerName;
		switch(step){
			case "ideas":
				routerName = "ideas";
			break;
			case "actions":
				routerName = "actions"
			break;
			default:
				routerName = "rootCause"
			break;
		}
		this._oRouter.navTo(routerName);
	},

	onStepPressed: function(oEvent){
		var step = oEvent.getParameter("id");
		var route, oStep;
		this.resetStepStyle();
		if(step.indexOf("step1") > -1){
			route = "rootCause";
			oStep = this.oStep1;
		}
		else if(step.indexOf("step2") > -1){
			route = "ideas";
			oStep = this.oStep2;
		}
		else{
				route = "actions";
				oStep = this.oStep3;
		}
		if(route){
			this.highlightStepStyle(oStep);
			this._oRouter.navTo(route);
		}
	},

	resetStepStyle:function(){
		this.oStep1.removeStyleClass("selected");
		this.oStep2.removeStyleClass("selected");
		this.oStep3.removeStyleClass("selected");
	},

	highlightStepStyle: function(control){
		control.addStyleClass("selected");
	},

	selectTab:function(key){
		//this.byId("tabBar").fireSelect({"key":key});
	},

	onNavBack: function() {
		window.history.go(-1);
	},

	// this handler opens the Jam/Share dialog with an Action Sheet containing the standard "AddBookmark" button
	onSharePressed: function(oEvent) {
		console.log("share pressed");
	}

});