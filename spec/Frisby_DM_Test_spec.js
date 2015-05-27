describe('DM server API Test Suite', function() {
    var frisby = require('frisby');

    //Test get_dm_ip API
    frisby.create('Get Device Manager IP')
        .get('https://localhost:8080/web/v2/client/get_dm_ip',
            { strictSSL: false /* options to pass to request go here */})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/html; charset=utf-8')
        .expectBodyContains('https')
        .toss();

    //Test get_firmware_list API with no key option
    frisby.create('Get Firmware List')
        .get('https://localhost:8080/web/v2/client/get_firmware_list',
            { strictSSL: false})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'text/html; charset=utf-8')
        //Test get_firmware_list API with key option,and get key from previous test's res
        .afterJSON(function(res) {
            frisby.create('Second test, run after first is completed')
                .get('https://localhost:8080/web/v2/client/get_firmware_list?key='+res[0].model_name,
                  { strictSSL: false})
                .expectStatus(200)
                .expectHeaderContains('content-type', 'text/html; charset=utf-8')
            .toss()
        })
        .toss();

});