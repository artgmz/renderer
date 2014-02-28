# Renderer

## Description:
Creates an ESRI ArcGIS API renderer depending on the type given. Does standard simple, simple picture, and unique value renderers. Also creates a "date" type renderer that draws graphics based on date stamps. This is done by overwriting the "getSymbol()" function on a simple renderer and can be used as an example for how to write your own custom renderers in the future.

## Dependencies:
* ESRI ArcGIS API 3.7
* MomentJS 2.4.0

## Notes:
* These renderers will only work once added to an ESRI graphics layer.
* You must modify the code for renderers that use images (picture, date) in order to use your own.
* You can modify the colors by adding your own in RGBa format.

## Sample Usage:
```
var blueRenderer = renderer.create("simpleBlue");
```