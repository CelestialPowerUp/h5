;(function () {
    'use strict';

    //yangaiche(sys.load_module)('');
    //yangaiche(sys.load_default_module)('');
    //yangaiche(sys.load_lib_module)('');

    yangaiche(sys.init)(function (t) {
        //debugger;

        const resources = {
            defineFnA: 'function A() {console.log(\'A\' + B);}',
            defineVarB: 'var B = \"b\";',
        };

        var geval = eval;

        geval(resources.defineVarB.toString());
        console.log(B);
        geval(resources.defineFnA.toString());
        A();
    });
}());