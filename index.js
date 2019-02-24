var Flow = require('./flow')
const base_express_server = require('./lib/base-express-server');
const base_minio = require('./lib/base-minio');


const modules = {
  "base-express-server": base_express_server,
  "base-minio": base_minio,
}

class VideoBlobs {
  constructor(base_express_server, base_minio) {

    this.connections = {
      "base-express-server": {},
      "base-minio": {}
    };

    this.connections['base-express-server']['8c8496a2-929f-4c32-a530-ca2c61bb3b0d'] = base_express_server;
    this.connections['base-minio']['8c8496a2-929f-4c32-a530-ca2c61bb3b0d'] = base_minio;
    let flowable = new Flow(modules, this.connections, {
      "flow": {
        "nodes": [{
          "id": "9d46ef0a-547a-48e5-9d6f-68f5b1d330f6",
          "module_name": "base-express-server",
          "config": {
            "params": {
              "route": "string",
              "method": "string"
            },
            "output": {
              "params": {},
              "body": {},
              "query": {}
            }
          },
          "opts": {
            "route": "/videos",
            "method": "GET"
          },
          "delegator": "register",
          "ports": [{
            "id": "be21f096-9392-488a-9521-61e35a796d0f",
            "type": "default",
            "selected": false,
            "name": "deeb4ab0-6c15-4164-a64b-8f0a80e3e130",
            "parentNode": "9d46ef0a-547a-48e5-9d6f-68f5b1d330f6",
            "links": [],
            "in": false,
            "label": "Out"
          }, {
            "id": "96c80c9d-353b-4266-90f7-bb886d1cb7cc",
            "type": "default",
            "selected": false,
            "name": "22bb8867-ecfd-4804-b4ea-a5f5b69b633f",
            "parentNode": "9d46ef0a-547a-48e5-9d6f-68f5b1d330f6",
            "links": [],
            "in": true,
            "label": "In"
          }],
          "module_inst": "8c8496a2-929f-4c32-a530-ca2c61bb3b0d"
        }, {
          "id": "53c4be0a-4859-4ad3-bc43-5228f34312de",
          "module_name": "base-minio",
          "config": {
            "params": {
              "bucket": "string",
              "prefix": "string"
            },
            "output": {
              "result": []
            }
          },
          "opts": {
            "bucket": "videos",
            "prefix": "test-folder/"
          },
          "delegator": "listObjects",
          "ports": [{
            "id": "fd2c7e9e-0484-46dd-8cbf-138ef37908a6",
            "type": "default",
            "selected": false,
            "name": "da7f15ec-1533-4978-9b78-811b28a93cc0",
            "parentNode": "53c4be0a-4859-4ad3-bc43-5228f34312de",
            "links": [],
            "in": false,
            "label": "Out"
          }, {
            "id": "ce4f0bc3-a5e3-4be8-b6b3-f341d02326f7",
            "type": "default",
            "selected": false,
            "name": "0381d19b-9fe3-4e6d-89de-147c2ad57e01",
            "parentNode": "53c4be0a-4859-4ad3-bc43-5228f34312de",
            "links": [],
            "in": true,
            "label": "In"
          }],
          "module_inst": "8c8496a2-929f-4c32-a530-ca2c61bb3b0d"
        }],
        "links": [{
          "id": "ad64b064-1454-4be7-9b0c-1e33669b0062",
          "src": "9d46ef0a-547a-48e5-9d6f-68f5b1d330f6",
          "dst": "53c4be0a-4859-4ad3-bc43-5228f34312de",
          "srcPort": "be21f096-9392-488a-9521-61e35a796d0f",
          "dstPort": "ce4f0bc3-a5e3-4be8-b6b3-f341d02326f7"
        }]
      }
    });

    flowable.start_flow();
  }
}

module.exports = VideoBlobs