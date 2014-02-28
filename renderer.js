// Renderer module.
// Create valid ArcGIS renderer, based on type.
var renderer = (function (esri, moment) {
    "use strict";

    // Return a valid ArcGIS renderer according to specified type.
    // TYPE: Either "simpleBlue"/"simpleRed"/"picture"/"date"/"unique". Defaults to "unique".
    function create(type) {
        if (type === "simpleBlue" || type === "simpleRed") {
            return simple(type);
        } else if (type === "picture") {
            return picture();
        } else if (type === "date") {
            return dateBreaks();
        } else {
            return uniqueValue();
        }
    }

    // Helper to return a Simple renderer for drawing circular graphics.
    // TYPE: Either "simpleBlue"/"simpleRed".
    function simple(type) {
        var colors = { simpleBlue: new dojo.Color([0, 90, 121, 0.7]), simpleRed: new dojo.Color([191, 0, 0, 0.7]) },
            symbol = new esri.symbol.SimpleMarkerSymbol().setSize(16).setColor(colors[type]),
            outline = new esri.symbol.SimpleLineSymbol().setWidth(16).setColor(colors[type]);

        return new esri.renderer.SimpleRenderer(symbol.setOutline(outline));
    }

    // Helper to return a Simple Picture renderer for drawing a more complex graphic.
    function picture() {
        var symbol = new esri.symbol.PictureMarkerSymbol().setWidth(24).setHeight(64);
        return new esri.renderer.SimpleRenderer(symbol.setUrl("img/pegman-symbol.png"));
    }

    // Helper to return a custom renderer, Date Breaks, for drawing past/present/future graphics based on their beginning and ending dates.
    function dateBreaks() {
        var today = new Date(moment()),
            symbol = new esri.symbol.PictureMarkerSymbol().setWidth(24).setHeight(32),
            renderer = new esri.renderer.SimpleRenderer(null);

        // Overrides Simple Renderer's getSymbol function to detect appropriate symbol for graphic's date.
        renderer.getSymbol = function (graphic) {
            var schedBeginDate = new Date(graphic.attributes.beginDate),
                schedEndDate = new Date(graphic.attributes.endDate);

            if (today > schedEndDate) {
                return symbol.setUrl("img/past-symbol.png");
            } else if (today >= schedBeginDate && today <= schedEndDate) {
                return symbol.setUrl("img/present-symbol.png");
            } else {
                return symbol.setUrl("img/future-symbol.png");
            }
        };

        return renderer;
    }

    // Helper to return a Unique Value renderer. For drawing graphics based on their color property's value.
    function uniqueValue() {
        var outline = new esri.symbol.SimpleLineSymbol().setWidth(0),
            symbol = new esri.symbol.SimpleMarkerSymbol().setSize(32).setOutline(outline),
            renderer = new esri.renderer.UniqueValueRenderer(null, "color"),
            values = [{ name: "GREEN", color: new dojo.Color([3, 108, 28, 0.7]) },
                      { name: "ORANGE", color: new dojo.Color([108, 80, 3, 0.7]) },
                      { name: "RED", color: new dojo.Color([108, 3, 3, 0.7]) }];

        for (var i = 0, len = values.length; i < len; ++i) {
            renderer.addValue(values[i].name, symbol.setColor(values[i].color));
        }

        return renderer;
    }

    // Module method.
    return { create: create };
})(esri, moment);