sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'l/leacture/test/integration/FirstJourney',
		'l/leacture/test/integration/pages/lecturesList',
		'l/leacture/test/integration/pages/lecturesObjectPage'
    ],
    function(JourneyRunner, opaJourney, lecturesList, lecturesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('l/leacture') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThelecturesList: lecturesList,
					onThelecturesObjectPage: lecturesObjectPage
                }
            },
            opaJourney.run
        );
    }
);