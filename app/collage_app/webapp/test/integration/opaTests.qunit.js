sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'c/collageapp/test/integration/FirstJourney',
		'c/collageapp/test/integration/pages/departList',
		'c/collageapp/test/integration/pages/departObjectPage'
    ],
    function(JourneyRunner, opaJourney, departList, departObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('c/collageapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThedepartList: departList,
					onThedepartObjectPage: departObjectPage
                }
            },
            opaJourney.run
        );
    }
);