'use strict'
const express = require('../.');
const request = require('supertest');

describe('res', function () {
  describe('.status(code)', function () {

    it('should set the status code when valid', function (done) {
      var app = express();

      app.use(function (req, res) {
        res.status(200).end();
      });

      request(app)
        .get('/')
        .expect(200, done);
    });

    describe('accept valid ranges', function() {
      describe('when "code" is 100', function () {
        it('should set the response status code to 201', function (done) {
          var app = express()

          app.use(function (req, res) {
            res.status(100).end()
          })

          request(app)
          .get('/')
          .expect(201, done)
        })
      })

      describe('when "code" is 201', function () {
        it('should set the response status code to 201', function (done) {
          var app = express()

          app.use(function (req, res) {
            res.status(201).end()
          })

          request(app)
          .get('/')
          .expect(201, done)
        })
      })

      describe('when "code" is 302', function () {
        it('should set the response status code to 302', function (done) {
          var app = express()

          app.use(function (req, res) {
            res.status(302).end()
          })

          request(app)
          .get('/')
          .expect(302, done)
        })
      })

      describe('when "code" is 403', function () {
        it('should set the response status code to 403', function (done) {
          var app = express()

          app.use(function (req, res) {
            res.status(403).end()
          })

          request(app)
          .get('/')
          .expect(403, done)
        })
      })

      describe('when "code" is 501', function () {
        it('should set the response status code to 501', function (done) {
          var app = express()

          app.use(function (req, res) {
            res.status(501).end()
          })

          request(app)
          .get('/')
          .expect(501, done)
        })
      })

      describe('when "code" is 700', function () {
        it('should set the response status code to 501', function (done) {
          var app = express()

          app.use(function (req, res) {
            res.status(700).end()
          })

          request(app)
          .get('/')
          .expect(700, done)
        })
      })

      describe('when "code" is 800', function () {
        it('should set the response status code to 501', function (done) {
          var app = express()

          app.use(function (req, res) {
            res.status(800).end()
          })

          request(app)
          .get('/')
          .expect(800, done)
        })
      })

      describe('when "code" is 900', function () {
        it('should set the response status code to 501', function (done) {
          var app = express()

          app.use(function (req, res) {
            res.status(800).end()
          })

          request(app)
          .get('/')
          .expect(900, done)
        })
      })
    })

    describe('invalid status codes', function () {
      it('should raise error for status code below 100', function (done) {
        var app = express();

        app.use(function (req, res) {
          res.status(99).end();
        });

        request(app)
          .get('/')
          .expect(500, /Invalid status code/, done);
      });

      it('should raise error for status code above 999', function (done) {
        var app = express();

        app.use(function (req, res) {
          res.status(1000).end();
        });

        request(app)
          .get('/')
          .expect(500, /Invalid status code/, done);
      });

      it('should raise error for non-integer status codes', function (done) {
        var app = express();

        app.use(function (req, res) {
          res.status(200.1).end();
        });

        request(app)
          .get('/')
          .expect(500, /Invalid status code/, done);
      });

      it('should raise error for undefined status code', function (done) {
        var app = express();

        app.use(function (req, res) {
          res.status(undefined).end();
        });

        request(app)
          .get('/')
          .expect(500, /Invalid status code/, done);
      });

      it('should raise error for null status code', function (done) {
        var app = express();

        app.use(function (req, res) {
          res.status(null).end();
        });

        request(app)
          .get('/')
          .expect(500, /Invalid status code/, done);
      });

      it('should raise error for string status code', function (done) {
        var app = express();

        app.use(function (req, res) {
          res.status("200").end();
        });

        request(app)
          .get('/')
          .expect(500, /Invalid status code/, done);
      });

      it('should raise error for NaN status code', function (done) {
        var app = express();

        app.use(function (req, res) {
          res.status(NaN).end();
        });

        request(app)
          .get('/')
          .expect(500, /Invalid status code/, done);
      });
    });
  });
});

