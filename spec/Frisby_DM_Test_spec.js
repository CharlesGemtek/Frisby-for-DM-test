describe('HTTP Method Test Suite', function() {
    var frisby = require('frisby');

    frisby.create('Get Device Manager IP')
          .get('https://localhost:8080/web/v2/client/get_dm_ip',
             { strictSSL: false /* options to pass to request go here */})
          .expectStatus(200)
          .expectHeaderContains('content-type', 'text/html; charset=utf-8')
          .expectBodyContains('https')
          .inspectBody()
          .toss();

/*    frisby.create('POST Method')
          .post('http://localhost:8080')
          .expectStatus(200)
          .expectHeaderContains('content-type', 'application/json')
          .expectJSON({
              method : 'POST'
          })
          .toss();

    frisby.create('PUT Method')
          .put('http://localhost:8080')
          .expectStatus(200)
          .expectHeaderContains('content-type', 'application/json')
          .expectJSON({
              method : 'PUT'
          })
          .expectJSONTypes({
              method : String
          }).toss();

    frisby.create('DELETE Method')
          .delete('http://localhost:8080')
          .expectStatus(200)
          .expectHeaderContains('content-type', 'application/json')
          .expectJSON({
              method : 'DELETE'
          })
          .expectJSONTypes({
              method : String
          }).toss();*/
});