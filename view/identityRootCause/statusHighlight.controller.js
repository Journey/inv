jQuery.sap.require("sap.ui.core.mvc.Controller");

 

sap.ui.core.mvc.Controller.extend("sap.mtk.poc.IGA.view.identityRootCause.statusHighlight", {

               

                onInit: function() {

                                //this.initSmartTable();
                	this.createTiles();
                	this.smartTableContnetContainer = this.byId("smartTableContnetContainer");
                	this.initCustomeModel();
                                

                },
                
                createTiles: function(){
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
            		//[tile1, tile2, tile3,smartTableContainer];
            		this.byId("tiles").addContent(tile1).addContent(tile2).addContent(tile3)
                	
                },

                initCustomeModel: function () {

                    var data = {

                                    type:{

                                                    chart:"Default",

                                                    table: "Emphasized",

                                                    fullScreen:"Default"

                                    }

                    }



                    this.customModel = new sap.ui.model.json.JSONModel(data);



                    this.getView().setModel(this.customModel,"custom");

    },



    getTableContent: function (key) {

                    var sFragment;

                    switch(key){

                                    case "chart":

                                                    sFragment = "sap.mtk.poc.IGA.view.fragment.chart";

                                    break;

                                    default:

                                                    sFragment = "sap.mtk.poc.IGA.view.fragment.table";

                                    break;

                    }



                    return new sap.ui.core.Fragment({

                                    fragmentName:sFragment,

                                    type:"XML"

                    });

    },



    resetCustomModel: function () {

                    var odata = this.customModel.getData();

                    odata.type ={

                                    chart:"Default",

                                    table:"Default",

                                    fullScreen:"Default"

                    };

                    this.customModel.checkUpdate();

    },



    clearTableContent: function () {

                    this.smartTableContnetContainer.removeAllContent();

    },

    showTable: function(){

                    this.clearTableContent();

                    this.smartTableContnetContainer.addContent( this.getTableContent("table") );

                    this.resetCustomModel();

                    this.customModel.setProperty("/type/table","Emphasized");

    },



    showChart: function(){

                    this.clearTableContent();

                    this.resetCustomModel();

                    this.customModel.setProperty("/type/chart","Emphasized");

                    this.smartTableContnetContainer.addContent( this.getTableContent("chart") );

    },



    showFullScreen: function(){

                    this.smartTableContnetContainer.addStyleClass("full");



    }


});