/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log'], (log) => {
    return {
        beforeLoad: (context) => {
            log.debug({
                title: 'Hello World',
                details: 'The NetSuite Developer script has successfully triggered!'
            });
        }
    };
});