sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'l.leacture',
            componentId: 'lecturesObjectPage',
            contextPath: '/lectures'
        },
        CustomPageDefinitions
    );
});