const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.json');
const fs = require('fs');
const _ = require('lodash');

var Color = require('tinycolor2')

StyleDictionary.registerFormat({
  name: 'custom/format/qml',
  formatter: _.template(fs.readFileSync(__dirname + '/templates/qml.template'))
});

StyleDictionary.registerTransform({
  name: 'color/qthex8',
  type: 'value',
  matcher: function(prop) {
      return prop.attributes.category === 'color';
  },
  transformer: function(prop) {
    // Qt is using ARGB hex8
    var str = Color(prop.value).toHex8();
    output = '#' + str.slice(6) + str.slice(0,6);
    return '\"' + output + '\"';
  }
});

StyleDictionary.registerTransformGroup({
  name: 'custom/qml',
  transforms: ['attribute/cti', 'name/cti/camel', 'color/qthex8']
});

StyleDictionary.buildAllPlatforms();
