function triangulate(lat, lon){
    var url = "http://prod.whisper.sh/whispers/nearby?lat=" + lat + "&lon="+ lon + "&page=0&limit=20";
    var diffUrl = "http://prod.whisper.sh/whispers/nearby?lat=" + (lat + .1)  + "&lon="+ lon + "&page=0&limit=20";
    var reallyDiffUrl = "http://prod.whisper.sh/whispers/nearby?lat=" + lat  + "&lon="+ (lon + .1) + "&page=0&limit=20";
    var urlObject;
    var diffUrlObject;
    var reallyDiffUrlObject;
    var yql_url = 'https://query.yahooapis.com/v1/public/yql';
    var finalObject = []
    $.ajax({
        'url': yql_url,
        'data': {
            'q': 'SELECT * FROM json WHERE url ="'+ url +'"',
            'format':'json',
            'jsonCompact': 'new',
        },
        'dataType': 'jsonp',
        'success': function(resp1) {
            console.log(resp1.query.results.json.nearby);
            urlObject = resp1.query.results.json.nearby;
            $.ajax({
                'url': yql_url,
                'data': {
                    'q': 'SELECT * FROM json WHERE url ="'+ diffUrl +'"',
                    'format':'json',
                    'jsonCompact': 'new',
                },
                'dataType': 'jsonp',
                'success': function(resp2) {
                    console.log(resp2.query.results.json.nearby);
                    diffUrlObject = resp2.query.results.json.nearby;
                    $.ajax({
                        'url': yql_url,
                        'data': {
                            'q': 'SELECT * FROM json WHERE url ="'+ reallyDiffUrl +'"',
                            'format':'json',
                            'jsonCompact': 'new',
                        },
                        'dataType': 'jsonp',
                        'success': function(resp3) {
                            console.log(resp3.query.results.json.nearby);
                            reallyDiffUrlObject = resp3.query.results.json.nearby;

                            for(var i = 0; i < urlObject.length; i++){
                                for(var j = 0; j < urlObject.length; j++){
                                    if(urlObject[i].wid == diffUrlObject[j].wid){
                                        for(var k = 0; k < urlObject.length; k++){
                                            if(urlObject[i].wid == reallyDiffUrlObject[k].wid){
                                                console.log("___________________________________");
                                                var originalDistance = urlObject[i].distance;
                                                var secondDistance = diffUrlObject[i].distance;
                                                var thirdDistance = reallyDiffUrlObject[i].distance;
                                                console.log(lat + ", " + lon);
                                                console.log(originalDistance);
                                                console.log((lat + .1) + ", " + lon);
                                                console.log(secondDistance);
                                                console.log(lat + ", " + (lon + .1));
                                                console.log(thirdDistance);
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    });


                }
            });

        }
    });



    var returnObject = {url: "", mapsUrl: ""};

}

triangulate(38.8225909761771, -75.9375);





