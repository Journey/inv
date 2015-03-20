// define a root UI component that exposes the main view
jQuery.sap.declare("sap.mtk.poc.IGA.Component");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ui.core.routing.History");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

sap.ui.core.UIComponent.extend("sap.mtk.poc.IGA.Component", {
    metadata : {
        "name" : "Inventory Analysis Guidea",
        "version" : "1.1.0-SNAPSHOT",
        "library" : "sap.mtk.poc.IGA",
        "includes" : [ "css/mtk.css" ],
        "dependencies" : {
            "libs" : [ "sap.m", "sap.me", "sap.ushell", "sap.ui.table", "sap.ui.comp", "sap.suite.ui.commons" ],
            "components" : []
        },
        "config" : {
            "resourceBundle" : "i18n/i18n.properties",
            "titleResource" : "shellTitle",
            "icon" : "sap-icon://Fiori6/F0866",
            "favIcon" : "icon/F0866_My_Shops.ico",
            "phone" : "icon/launchicon/57_iPhone_Desktop_Launch.png",
            "phone@2" : "icon/launchicon/114_iPhone-Retina_Web_Clip.png",
            "tablet" : "icon/launchicon/72_iPad_Desktop_Launch.png",
            "tablet@2" : "icon/launchicon/144_iPad_Retina_Web_Clip.png",
            "serviceConfig": {
					"name": "EPM_REF_APPS_SHOP",
					"serviceUrl": "/FioriLaunchpad/services/COGS.xsodata/"
			}
        },
        routing : {
            // The default values for routes
            "config" : {
                "viewType" : "XML",
                "viewPath" : "sap.mtk.poc.IGA.view",
                "targetControl" : "fioriContent", // This is the control in which new views are placed (sap.m.App in
                // the Main view)
                "targetAggregation" : "pages", // This is the aggregation in which the new views will be placed
                // placed -> sap.m.App
                "clearTarget" : true
            },

            // There are no route hierarchies here because the parent view (Main) is created by function createContent
            // which is called during initialization of the UIComponent
            "routes" : {
                "default":{
                    "pattern":"",
                    "view":"root",
                    "subroutes":{
                        "ideas":{
                            "pattern":"ideas",
                            "view":"ideas",
                            targetControl:"rootContainer",
                            targetAggregation:"content",
                            "clearTarget" : true,
                            "transition": "show"
                        },
                        "actions":{
                            "pattern":"actions",
                            "view":"actions",
                            targetControl:"rootContainer",
                            targetAggregation:"content",
                            "clearTarget" : true,
                            "transition": "show"
                        },
                        "rootCause":{
                            pattern:"rootCause",
                            view:"rootCause",
                            targetControl:"rootContainer",
                            targetAggregation:"content",
                            "clearTarget" : true,
                            "transition": "show"
                            /*subroutes:[
                                {
                                    pattern : "highlight",
                                    name : "highlight",
                                    view : "identityRootCause.statusHighlight",
                                    targetControl:"rootCauseContainer",
                                    targetAggregation:"content",
                                    "clearTarget" : true
                                },
                                {
                                    pattern : "wip",
                                    name : "wip",
                                    view : "identityRootCause.wip",
                                    targetControl:"rootCauseContainer",
                                    targetAggregation:"content",
                                    "clearTarget" : true
                                },
                                {
                                    pattern : "fcst",
                                    name : "fcst",
                                    view : "identityRootCause.fcstAnalysis",
                                    targetControl:"rootCauseContainer",
                                    targetAggregation:"content",
                                    "clearTarget" : true
                                }
                            ]*/
                        }
                    }
                }
            }
        }
    },

    /**
     * Initialize the application
     * 
     * @returns {sap.ui.core.Control} the content
     */
    createContent : function() {
        var oViewData = {
            component : this
        };

        return sap.ui.view({
            viewName : "sap.mtk.poc.IGA.view.Main",
            type : sap.ui.core.mvc.ViewType.XML,
            viewData : oViewData
        });
    },

    init : function() {
        // call super init (will call function "create content")
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var sRootPath = jQuery.sap.getModulePath("sap.mtk.poc.IGA");

        // Get the service URL for the oData model
		var oServiceConfig = this.getMetadata().getConfig().serviceConfig;
		var sServiceUrl = oServiceConfig.serviceUrl;

        // the metadata is read to get the location of the i18n language files later
        var mConfig = this.getMetadata().getConfig();

        this._routeMatchedHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter(), this._bRouterCloseDialogs);

        // create oData model
        var oDataModel = this._initODataModel(sServiceUrl);
		
		this.setModel(oDataModel, "odata");

        // set i18n model
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleUrl : [ sRootPath, mConfig.resourceBundle ].join("/")
        });
        this.setModel(i18nModel, "i18n");

        // initialize router and navigate to the first page
        this.getRouter().initialize();

    },

    exit : function() {
        this._routeMatchedHandler.destroy();
    },

    // This method lets the app can decide if a navigation closes all open dialogs
    setRouterSetCloseDialogs : function(bCloseDialogs) {
        this._bRouterCloseDialogs = bCloseDialogs;
        if (this._routeMatchedHandler) {
            this._routeMatchedHandler.setCloseDialogs(bCloseDialogs);
        }
    },

    // creation and setup of the oData model
    _initODataModel : function(sServiceUrl) {
        jQuery.sap.require("sap.mtk.poc.IGA.util.messages");
        var oConfig = {
            metadataUrlParams : {},
            json : true,
            // loadMetadataAsync : true,
            defaultBindingMode :"TwoWay",
            defaultCountMode: "Inline",
            useBatch : true
        };
        var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, oConfig);
        oModel.attachRequestFailed(null, sap.mtk.poc.IGA.util.messages.showErrorMessage);
        this.setModel(oModel,"odata");
        return oModel;
    }
});