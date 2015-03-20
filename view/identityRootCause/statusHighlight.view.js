sap.ui.jsview("sap.mtk.poc.IGA.view.identityRootCause.statusHighlight", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sap.mtk.poc.IGA.view.identityRootCause.statusHighlight
	*/ 
	getControllerName : function() {
		return "sap.mtk.poc.IGA.view.identityRootCause.statusHighlight";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sap.mtk.poc.IGA.view.identityRootCause.statusHighlight
	*/ 
	createContent : function(oController) {
		
		var jsonModel = new sap.ui.model.json.JSONModel();
		jsonModel.loadData("/FioriLaunchpad/services/INV_SUM.xsodata/INV_SUM/?$format=json&$filter=BU%20eq%20%27TOTAL%27&$select=INV_TOTAL", null, false);
		var json = jsonModel.getProperty("/d/results");
		var inv = parseFloat(new Number(json[0].INV_TOTAL / 1000 / 1000).toFixed(1) + "");

		var tile1 = new sap.suite.ui.commons.GenericTile({
			header: "Inventory",
			subheader: "Global - Year to Date",
			size: "S",
			frameType: "OneByOne",
			tileContent: [
			              new sap.suite.ui.commons.TileContent({
			            	  footer: "Actual",
			            	  unit: "TWD",
			            	  size: "S",
			            	  content: new sap.suite.ui.commons.NumericContent({
			            		  size: "S",
			            		  scale: "M",
			            		  value: inv,
			            		  valueColor: "Good"
			            	  })
			              })
			              ]
		});
		
		jsonModel.loadData("/FioriLaunchpad/services/INV_SUM.xsodata/INV_SUM/?$format=json&$filter=BU%20eq%20%27TOTAL%27&$select=TURNOVER_DAYS", null, false);
		json = jsonModel.getProperty("/d/results");
		var tod = parseFloat(json[0].TURNOVER_DAYS);
		
		var tile2 = new sap.suite.ui.commons.GenericTile({
			header: "Turnover Day",
			subheader: "Global - Year to Date",
			size: "S",
			frameType: "OneByOne",
			tileContent: [
			              new sap.suite.ui.commons.TileContent({
			            	  footer: "Actual",
			            	  unit: "TWD",
			            	  size: "S",
			            	  content: new sap.suite.ui.commons.NumericContent({
			            		  size: "S",
			            		  scale: "day",
			            		  value: tod,
			            		  valueColor: "Error"
			            	  })
			              })
			              ]
		});
		
		jsonModel.loadData("/FioriLaunchpad/services/COGS_SUM.xsodata/COGS_SUM/?$format=json&$select=COGS", null, false);
		json = jsonModel.getProperty("/d/results");
		var cogs = parseFloat(new Number(json[0].COGS / 1000 / 1000 / 1000).toFixed(1) + "");
		
		var tile3 = new sap.suite.ui.commons.GenericTile({
			header: "COGS",
			subheader: "Global - Year to Date",
			size: "S",
			frameType: "OneByOne",
			tileContent: [
			              new sap.suite.ui.commons.TileContent({
			            	  footer: "Actual",
			            	  unit: "TWD",
			            	  size: "S",
			            	  content: new sap.suite.ui.commons.NumericContent({
			            		  size: "S",
			            		  scale: "B",
			            		  value: cogs,
			            		  valueColor: "Critical"
			            	  })
			              })
			              ]
		});
		
		var smartTableContainer = new sap.mtk.poc.IGA.control.Container({
			id:'smartTable'
		});
		
		this.smartTableContainer = smartTableContainer;
		
		return [tile1, tile2, tile3,smartTableContainer];
	}

});
