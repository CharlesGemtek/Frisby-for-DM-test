describe('DM server API Test Suite', function() {
    var frisby = require('frisby');
    var test_ModelName = "DM_TEST1";

    //Test get_dm_ip API
    frisby.create('Get Device Manager IP')
        .get('https://localhost:8080/web/v2/client/get_dm_ip',
            { strictSSL: false })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/html; charset=utf-8')
        .expectBodyContains('https')
        .toss();

    //Test get_firmware_list API with no key option (WEB)
    frisby.create('Get Firmware List without key')
        .get('https://localhost:8080/web/v2/client/get_firmware_list',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/html; charset=utf-8')
        //Test get_firmware_list API with key option,and get key from previous test's res
        .afterJSON(function(res) {
            frisby.create('Get Firmware List with key ')
                .get('https://localhost:8080/web/v2/client/get_firmware_list?key='+test_ModelName,
                  { strictSSL: false})
                .expectStatus(200)
                .expectHeaderContains('content-type', 'text/html; charset=utf-8')
            .toss()

            frisby.create('Get Firmware List with key empty')
                .get('https://localhost:8080/web/v2/client/get_firmware_list?key=',
                  { strictSSL: false})
                .expectStatus(400)
                .expectHeaderContains('content-type', 'text/html; charset=utf-8')
            .toss()

            frisby.create('Get Firmware List with no such key')
                .get('https://localhost:8080/web/v2/client/get_firmware_list?key=00000000000',
                  { strictSSL: false})
                .expectStatus(400)
                .expectHeaderContains('content-type', 'text/html; charset=utf-8')
            .toss()
        })
        .toss();

    //Test get_firmware_list API with no key option (DM)
    frisby.create('Get Firmware List without key')
        .get('https://localhost:443/dm/v2/client/get_firmware_list',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json; charset=utf-8')
        //Test get_firmware_list API with key option,and get key from previous test's res
        .afterJSON(function(res) {
            frisby.create('Get Firmware List with key ')
                .get('https://localhost:443/dm/v2/client/get_firmware_list?key='+test_ModelName,
                  { strictSSL: false})
                .expectStatus(200)
                .expectHeaderContains('content-type', 'application/json; charset=utf-8')
            .toss()

            frisby.create('Get Firmware List with key empty')
                .get('https://localhost:443/dm/v2/client/get_firmware_list?key=',
                  { strictSSL: false})
                .expectStatus(400)
                .expectHeaderContains('content-type', 'application/json; charset=utf-8')
            .toss()

            frisby.create('Get Firmware List with no such key')
                .get('https://localhost:443/dm/v2/client/get_firmware_list?key=00000000000',
                  { strictSSL: false})
                .expectStatus(400)
                .expectHeaderContains('content-type', 'application/json; charset=utf-8')
            .toss()
        })
        .toss();

    //Test Get Firmware (for old firmware) with model_name
    frisby.create('Get Firmware (for old firmware) from DM server')
        .get('https://localhost:443/dm/v1/fota/stable?model_name='+test_ModelName,
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json; charset=utf-8')
        .expectJSONTypes({
            'version' : String,
            'url' : String,
            'size' : Number,
            'checksum' : String,
            'reset_default' : String,
            'desc' : String
        })
        .toss();

    //Test Get Firmware (for old firmware) with model_name empty
    frisby.create('Get Firmware (for old firmware) from DM server')
        .get('https://localhost:443/dm/v1/fota/stable?model_name=',
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Get Firmware (for old firmware) with no such model_name
    frisby.create('Get Firmware (for old firmware) from DM server')
        .get('https://localhost:443/dm/v1/fota/stable?model_name=00000000000',
            { strictSSL: false})
        .expectStatus(500)
        .toss();

    //Test Get Firmware V2 with model_name (WEB)
    frisby.create('Get Firmware V2 from WEB server')
        .get('https://localhost:8080/web/v2/fota/stable?model_name='+test_ModelName,
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/html; charset=utf-8')
        .expectJSONTypes({
            'version' : String,
            'url' : String,
            'size' : Number,
            'checksum' : String,
            'reset_default' : String,
            'desc' : String
        })
        .toss();

    //Test Get Firmware V2 with model_name empty (WEB)
    frisby.create('Get Firmware V2 from WEB server')
        .get('https://localhost:8080/web/v2/fota/stable?model_name=',
            { strictSSL: false})
        .expectStatus(500)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Get Firmware V2 with no such model_name (WEB)
    frisby.create('Get Firmware V2 from WEB server')
        .get('https://localhost:8080/web/v2/fota/stable?model_name=00000000000',
            { strictSSL: false})
        .expectStatus(500)
        .toss();

    //Test Get Firmware V2 with version parameter (WEB)
    frisby.create('Get Firmware V2 from WEB server')
        .get('https://localhost:8080/web/v2/fota/stable?model_name='+test_ModelName+'&version=1',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/html; charset=utf-8')
        .expectJSONTypes({
            'version' : String,
            'url' : String,
            'size' : Number,
            'checksum' : String,
            'reset_default' : String,
            'desc' : String
        })
        .toss();

    //Test Get Firmware V2 with empty version parameter (WEB)
    frisby.create('Get Firmware V2 from WEB server')
        .get('https://localhost:8080/web/v2/fota/stable?model_name='+test_ModelName+'&version=',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/html; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Get Firmware V2 with error version parameter (WEB)
    frisby.create('Get Firmware V2 from WEB server')
        .get('https://localhost:8080/web/v2/fota/stable?model_name='+test_ModelName+'&version=-1',
            { strictSSL: false})
        .expectStatus(500)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();


    //Test Get Firmware V2 with model_name (DM)
    frisby.create('Get Firmware V2 from DM server')
        .get('https://localhost:443/dm/v2/fota/stable?model_name='+test_ModelName,
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json; charset=utf-8')
        .expectJSONTypes({
            'version' : String,
            'url' : String,
            'size' : Number,
            'checksum' : String,
            'reset_default' : String,
            'desc' : String
        })
        .toss();

    //Test Get Firmware V2 with model_name empty (DM)
    frisby.create('Get Firmware V2 from DM server')
        .get('https://localhost:443/dm/v2/fota/stable?model_name=',
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Get Firmware V2 with no such model_name (DM)
    frisby.create('Get Firmware V2 from DM server')
        .get('https://localhost:443/dm/v2/fota/stable?model_name=00000000000',
            { strictSSL: false})
        .expectStatus(500)
        .toss();

    //Test Get Firmware V2 with version parameter (DM)
    frisby.create('Get Firmware V2 from DM server')
        .get('https://localhost:443/dm/v2/fota/stable?model_name='+test_ModelName+'&version=1',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json; charset=utf-8')
        .expectJSONTypes({
            'version' : String,
            'url' : String,
            'size' : Number,
            'checksum' : String,
            'reset_default' : String,
            'desc' : String
        })
        .toss();

    //Test Get Firmware V2 with empty version parameter (DM)
    frisby.create('Get Firmware V2 from DM server')
        .get('https://localhost:443/dm/v2/fota/stable?model_name='+test_ModelName+'&version=',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Get Firmware V2 with error version parameter (DM)
    frisby.create('Get Firmware V2 from DM server')
        .get('https://localhost:443/dm/v2/fota/stable?model_name='+test_ModelName+'&version=-1',
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();



});