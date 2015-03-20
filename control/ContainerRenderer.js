/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

// Provides default renderer for control sap.mtk.poc.IGA.control.Container
jQuery.sap.declare("sap.mtk.poc.IGA.control.ContainerRenderer");

/**
 * @class Container renderer.
 * @static
 */
sap.mtk.poc.IGA.control.ContainerRenderer = {
};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.mtk.poc.IGA.control.ContainerRenderer.render = function(oRenderManager, oContainer) {
    // convenience variable
    var rm = oRenderManager;

    // return immediately if control is invisible
    if (!oContainer.getVisible()) {
        return;
    }

    // write the HTML into the render manager
    rm.write("<div");
    rm.writeControlData(oContainer);
    rm.addClass("container");

    if (oContainer.getWidth() && oContainer.getWidth() !== "") {
        rm.addStyle("width", oContainer.getWidth());
    }

    if(oContainer.getHeight() && oContainer.getHeight() !== "") {
        rm.addStyle("height", oContainer.getHeight());
    }

    if(oContainer.getMinHeight() && oContainer.getMinHeight() !== "") {
        rm.addStyle("min-height", oContainer.getMinHeight());
    }


    rm.writeStyles();
    rm.writeClasses();
    rm.write(">"); // div element

    // render content
    var aContent = oContainer.getContent();

    for (var i = 0; i < aContent.length; i++) {
        rm.renderControl(aContent[i]);
    }

    rm.write("</div>");
};
