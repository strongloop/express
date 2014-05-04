
var express = require('../')
  , request = require('supertest')
  , assert = require('assert');

describe('res', function(){
  describe('.json(object)', function(){
    it('should not support jsonp callbacks', function(done){
      var app = express();

      app.use(function(req, res){
        res.json({ foo: 'bar' });
      });

      request(app)
      .get('/?callback=foo')
      .expect('{"foo":"bar"}', done);
    })

    describe('when given primitives', function(){
      it('should respond with json', function(done){
        var app = express();

        app.use(function(req, res){
          res.json(null);
        });

        request(app)
        .get('/')
        .end(function(err, res){
          res.headers.should.have.property('content-type', 'application/json');
          res.text.should.equal('null');
          done();
        })
      })
    })

    describe('when given an array', function(){
      it('should respond with json', function(done){
        var app = express();

        app.use(function(req, res){
          res.json(['foo', 'bar', 'baz']);
        });

        request(app)
        .get('/')
        .end(function(err, res){
          res.headers.should.have.property('content-type', 'application/json');
          res.text.should.equal('["foo","bar","baz"]');
          done();
        })
      })
    })

    describe('when given an object', function(){
      it('should respond with json', function(done){
        var app = express();

        app.use(function(req, res){
          res.json({ name: 'tobi' });
        });

        request(app)
        .get('/')
        .end(function(err, res){
          res.headers.should.have.property('content-type', 'application/json');
          res.text.should.equal('{"name":"tobi"}');
          done();
        })
      })
    })

    describe('"json replacer" setting', function(){
      it('should be passed to JSON.stringify()', function(done){
        var app = express();

        app.set('json replacer', function(key, val){
          return '_' == key[0]
            ? undefined
            : val;
        });

        app.use(function(req, res){
          res.json({ name: 'tobi', _id: 12345 });
        });

        request(app)
        .get('/')
        .end(function(err, res){
          res.text.should.equal('{"name":"tobi"}');
          done();
        });
      })
    })

    describe('"json spaces" setting', function(){
      it('should be undefined by default', function(){
        var app = express();
        assert(undefined === app.get('json spaces'));
      })

      it('should be passed to JSON.stringify()', function(done){
        var app = express();

        app.set('json spaces', 2);

        app.use(function(req, res){
          res.json({ name: 'tobi', age: 2 });
        });

        request(app)
        .get('/')
        .end(function(err, res){
          res.text.should.equal('{\n  "name": "tobi",\n  "age": 2\n}');
          done();
        });
      })
    })
  })

  describe('.json(status, object)', function(){
    it('should respond with json and set the .statusCode', function(done){
      var app = express();

      app.use(function(req, res){
        res.json(201, { id: 1 });
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.statusCode.should.equal(201);
        res.headers.should.have.property('content-type', 'application/json');
        res.text.should.equal('{"id":1}');
        done();
      })
    })
  })

  describe('.json(object, status)', function(){
    it('should respond with json and set the .statusCode for backwards compat', function(done){
      var app = express();

      app.use(function(req, res){
        res.json({ id: 1 }, 201);
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.statusCode.should.equal(201);
        res.headers.should.have.property('content-type', 'application/json');
        res.text.should.equal('{"id":1}');
        done();
      })
    })
  })

  describe('.json(object, replacer)', function(){
    it('should respond with json using replacer and set the .statusCode as (obj,replacer)', function(done){
      var app = express();

      app.use(function(req, res){
        res.json({ id: 1, a: "b", c: "d" }, [ "a", "c"]);
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.statusCode.should.equal(200);
        res.headers.should.have.property('content-type', 'application/json');
        res.text.should.equal('{"a":"b","c":"d"}');
        done();
      })
    })
  })

  describe('.json(status, object, replacer)', function(){
    it('should respond with json using replacer and set the .statusCode as (status,obj,replacer)', function(done){
      var app = express();

      app.use(function(req, res){
        res.json(201, { id: 1, a: "b", c: "d" }, [ "a", "c"]);
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.statusCode.should.equal(201);
        res.headers.should.have.property('content-type', 'application/json');
        res.text.should.equal('{"a":"b","c":"d"}');
        done();
      })
    })
  })

  describe('.json(object, status, replacer)', function(){
    it('should respond with json using replacer and set the .statusCode as (obj,status,replacer)', function(done){
      var app = express();

      app.use(function(req, res){
        res.json({ id: 1, a: "b", c: "d" }, 201, [ "a", "c"]);
      });

      request(app)
      .get('/')
      .end(function(err, res){
        res.statusCode.should.equal(201);
        res.headers.should.have.property('content-type', 'application/json');
        res.text.should.equal('{"a":"b","c":"d"}');
        done();
      })
    })
  })

  it('should not override previous Content-Types', function(done){
    var app = express();

    app.get('/', function(req, res){
      res.type('application/vnd.example+json');
      res.json({ hello: 'world' });
    });

    request(app)
    .get('/')
    .end(function(err, res){
      res.statusCode.should.equal(200);
      res.headers.should.have.property('content-type', 'application/vnd.example+json');
      res.text.should.equal('{"hello":"world"}');
      done();
    })
  })
})
