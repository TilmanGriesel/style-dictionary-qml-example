const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.json');
const fs = require('fs');
const _ = require('lodash');

var Color = require('tinycolor2')

StyleDictionary.registerFormat({
  name: 'custom/format/qml',
  formatter: _.template(fs.readFileSync(__dirname + '/templates/qml.template'))
});

StyleDictionary.registerTransform({
  name: 'color/qtrgba',
  type: 'value',
  matcher: function(prop) {
      return prop.attributes.category === 'color';
  },
  transformer: function(prop) {
      var rgb = Color(prop.value).toRgb();
      var r = Math.round((rgb.r / 255) * 100) / 100;
      var g = Math.round((rgb.g / 255) * 100) / 100;
      var b = Math.round((rgb.b / 255) * 100) / 100;
      return 'Qt.rgba(' + r + ','+ g + ',' + b + ',' + rgb.a + ')';
  }
});

StyleDictionary.registerTransformGroup({
  name: 'custom/qml',
  transforms: ['attribute/cti', 'name/cti/camel', 'color/qtrgba']
});

StyleDictionary.buildAllPlatforms();
