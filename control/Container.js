/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */

// Provides control sap.mtk.poc.IGA.control.Container.
jQuery.sap.declare("sap.mtk.poc.IGA.control.Container");
jQuery.sap.require("sap.ui.layout.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Container.
 *
 * Accepts an object literal <code>mSettings</code> that defines initial
 * property values, aggregated and associated objects as well as event handlers.
 *
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event),
 * then the framework assumes property, aggregation, association, event in that order.
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:"
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul>
 * <li>{@link #getWidth width} : sap.ui.core.CSSSize</li>
 * <li>{@link #getHeight height} : sap.ui.core.CSSSize</li>
 * <li>{@link #getVisible visible} : boolean (default: true)</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getContent content} : sap.ui.core.Control[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul>

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * In this layout the elemnts are wrapped inside a DIV element.
 * @extends sap.ui.core.Control
 *
 * @author Roger Xu
 * @version 1.18.8
 *
 * @constructor
 * @public
 * @since 1.16.0
 * @name sap.mtk.poc.IGA.control.Container
 */
sap.ui.core.Control.extend("sap.mtk.poc.IGA.control.Container", { metadata : {

    // ---- object ----

    // ---- control specific ----
    library : "ui.control",
    properties : {
        "width" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
        "height" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null},
        "minHeight":{type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : ""},
        "visible" : {type : "boolean", group : "Appearance", defaultValue : true}
    },
    defaultAggregation : "content",
    aggregations : {
        "content" : {type : "sap.ui.core.Control", multiple : true, singularName : "content"}
    }
}});

// Start of ui/control/Container.js
jQuery.sap.require("sap.ui.core.EnabledPropagator");

sap.ui.core.EnabledPropagator.call(sap.mtk.poc.IGA.control.Container.prototype);
