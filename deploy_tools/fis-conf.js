
fis.config.set('modules.optimizer.js', 'uglify-js');
fis.config.set('settings.optimizer.uglify-js', {mangle: {except: 'exports, module, require, define'}});
fis.config.set('pack', {'/pkg/lib.js': ['js/common.js', 'js/router.js', 'js/modules/*.js']});
fis.config.set('modules.postpackager', 'simple');