/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-chartist',

  treeForVendor(vendorTree) {
    var chartistPath = path.dirname(require.resolve('chartist'));

    var chartistTree = new Funnel(chartistPath, {
      files: [
        'chartist.js',
        'chartist.css',
      ],
    });

    var chartistTreeSCSS = new Funnel(chartistPath, {
      srcDir: 'scss',

      include: [
        '*.scss',
      ],
    });

    return new MergeTrees([
      vendorTree,
      chartistTree,
      chartistTreeSCSS,
    ]);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/chartist.js');
    app.import('vendor/chartist.css');
    app.import('vendor/chartist.scss');
  },

  //included: function included(app, parentAddon) {
  //  var target = (parentAddon || app);

  //  var options = target.options['ember-cli-chartist'] || {};
  //  var chartistPath = path.join(target.bowerDirectory, 'chartist', 'dist');

  //  if (options.useCustomCSS) {
  //    target.options.sassOptions = target.options.sassOptions || {};
  //    target.options.sassOptions.includePaths = target.options.sassOptions.includePaths || [];

  //    target.options.sassOptions.includePaths.push(
  //      path.join(chartistPath, 'scss')
  //    );

  //    target.options.sassOptions.includePaths.push(
  //      path.join(chartistPath, 'scss', 'settings')
  //    );

  //  } else {
  //    target.import(path.join(chartistPath, 'chartist.min.css'));
  //  }

  //  app.import(path.join(chartistPath, 'chartist.js'));
  //}
};
