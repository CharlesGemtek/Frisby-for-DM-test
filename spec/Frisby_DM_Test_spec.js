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
        .toss();

    //Test Get Firmware V2 with error version parameter (WEB)
    frisby.create('Get Firmware V2 from WEB server')
        .get('https://localhost:8080/web/v2/fota/stable?model_name='+test_ModelName+'&version=-1',
            { strictSSL: false})
        .expectStatus(500)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
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
        .toss();

    //Test Get Firmware V2 with error version parameter (DM)
    frisby.create('Get Firmware V2 from DM server')
        .get('https://localhost:443/dm/v2/fota/stable?model_name='+test_ModelName+'&version=-1',
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Upload Firmware (WEB)
    var fs = require('fs');
    var path = require('path');
    var FormData = require('form-data');
    var filePath = __dirname+'/dm_test3';
    var form = new FormData();
    var count = 9
    var ModelName = "DM_TEST",
        customer = "Charles",
        description = "For test"

    var form_info = {
        "model_name" : ModelName+count,
        "version" : count,
        "customer" : customer+count,
        "description" : description+count,
        "reset_default" : "true"
    }
    form.append('firmware_info', JSON.stringify(form_info));
    form.append('file', fs.createReadStream(filePath), {
        // we need to set the knownLength so we can call  form.getLengthSync()
        knownLength: fs.statSync(filePath).size
    });

    frisby.create('Upload Firmware from WEB server')
        .post('https://localhost:8080/web/v2/fota/stable',form,
            {
                strictSSL: false,
                headers: {
                  'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
                  'content-length': form.getLengthSync()
                }
            })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Upload Firmware (DM)
    frisby.create('Upload Firmware from DM server')
        .post('https://localhost:443/dm/v2/fota/stable',form,
            {
                strictSSL: false,
                headers: {
                  'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
                  'content-length': form.getLengthSync()
                }
            })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Delete Firmware (WEB)
    frisby.create('Delete Firmware from WEB server')
        .delete('https://localhost:8080/web/v2/fota/stable?model_name=DM_TEST9&version=9',null,
            {strictSSL: false })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Delete Firmware (WEB) with error model_name
    frisby.create('Delete Firmware from WEB server with error model_name')
        .delete('https://localhost:8080/web/v2/fota/stable?model_name=0000000&version=5',null,
            {strictSSL: false })
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Delete Firmware (WEB) with error version
    frisby.create('Delete Firmware from WEB server')
        .delete('https://localhost:8080/web/v2/fota/stable?model_name=DM_TEST9&version=-1',null,
            {strictSSL: false })
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Delete Firmware (DM)
    frisby.create('Delete Firmware from DM server')
        .delete('https://localhost:443/dm/v2/fota/stable?model_name=DM_TEST9&version=9',null,
            {strictSSL: false })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Delete Firmware (DM) with error model_name
    frisby.create('Delete Firmware from DM server with error model_name')
        .delete('https://localhost:443/dm/v2/fota/stable?model_name=000000000&version=2',null,
            {strictSSL: false })
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();

    //Test Delete Firmware (DM) with error version
    frisby.create('Delete Firmware from DM server')
        .delete('https://localhost:443/dm/v2/fota/stable?model_name=DM_TEST9&version=-1',null,
            {strictSSL: false })
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .toss();


    //Test Get Device Firmware ; need test_tool to simulate device operation before using
    frisby.create('Get Device Firmware from WEB server')
        .get('https://localhost:8080/web/v2/fota/device/firmware?gid=1,2,3&from=10,20&size=5,5&socket_id=DE7itWKqUTokJT0mAAAA',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Get Device Firmware with error socket_id
    frisby.create('Get Device Firmware from WEB server')
        .get('https://localhost:8080/web/v2/fota/device/firmware?gid=1,2,3&from=10,20&size=5,5&socket_id=DE7itWKqUTokJT0mAAAA000',
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Get Device Firmware
    frisby.create('Get Device Firmware from DM server')
        .get('https://localhost:443/dm/v2/fota/device/firmware?gid=1,2,3&from=10,20&size=5,5&socket_id=DE7itWKqUTokJT0mAAAA',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Get Device Firmware with error socket_id
    frisby.create('Get Device Firmware from DM server')
        .get('https://localhost:443/dm/v2/fota/device/firmware?gid=1,2,3&from=10,20&size=5,5&socket_id=DE7itWKqUTokJT0mAAAA000',
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();


    //Test Update Device Firmware ; need test_tool to simulate device operation before using
    frisby.create('Update Device Firmware from WEB server')
        .put('https://localhost:8080/web/v2/fota/device/firmware?gid=1,2,3&from=10,20&size=5,5&socket_id=DE7itWKqUTokJT0mAAAA',null,
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Update Device Firmware with error socket_id
    frisby.create('Update Device Firmware from WEB server')
        .put('https://localhost:8080/web/v2/fota/device/firmware?gid=1,2,3&from=10,20&size=5,5&socket_id=DE7itWKqUTokJT0mAAAA000',null,
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Update Device Firmware with empty gid
    frisby.create('Update Device Firmware from WEB server')
        .put('https://localhost:8080/web/v2/fota/device/firmware?gid=&from=&size=&socket_id=',null,
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Update Device Firmware ; need test_tool to simulate device operation before using
    frisby.create('Update Device Firmware from DM server')
        .put('https://localhost:443/dm/v2/fota/device/firmware?gid=1,2,3&from=10,20&size=5,5&socket_id=DE7itWKqUTokJT0mAAAA',null,
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Update Device Firmware with error socket_id
    frisby.create('Update Device Firmware from DM server')
        .put('https://localhost:443/dm/v2/fota/device/firmware?gid=1,2,3&from=10,20&size=5,5&socket_id=DE7itWKqUTokJT0mAAAA000',null,
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();

    //Test Update Device Firmware with empty gid
    frisby.create('Update Device Firmware from DM server')
        .put('https://localhost:443/dm/v2/fota/device/firmware?gid=&from=&size=&socket_id=',null,
            { strictSSL: false})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'text/plain; charset=utf-8')
        .inspectBody()
        .toss();
});
