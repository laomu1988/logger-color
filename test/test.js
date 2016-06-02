var logger = require('../index.js');

logger.log('Test Log', 'Log', "Log2");
logger.info('Test Info');
logger.debug('Test Debug');
logger.notice('Test Notice');
logger.warning('Test Info');
logger.error('Test Info');

var time = "***";
setInterval(function () {
    time += '*';
    logger.line('error', 'Test Time: ' + time);
}, 100);

setInterval(function () {
    logger.lineEnd();
    logger.info('test');
}, 1000);