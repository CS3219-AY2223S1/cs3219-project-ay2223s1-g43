import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import EasyQuestion from '../models/easyQuestion.model.js';
import HardQuestion from '../models/hardQuestion.model.js';
import MediumQuestion from '../models/mediumQuestion.model.js';
import seedrandom from "seedrandom";

chai.use(chaiHttp);
chai.should();

describe('/api/question', () => {
  after((done) => {
    EasyQuestion.deleteMany({}, () => { })
    MediumQuestion.deleteMany({}, () => { })
    HardQuestion.deleteMany({}, () => { })
    done();
  });

  describe('Create question', () => {
    it('Create easy question', (done) => {
      chai.request(app)
        .post('/api/question' + '/easy')
        .send({ id: 1, title: 'Test1', body: 'Test1'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(201);
          res.body.message.should.equal('New question created successfully!');
          done();
        });
    });

    it('Create medium question', (done) => {
      chai.request(app)
        .post('/api/question' + '/medium')
        .send({ id: 2, title: 'Test2', body: 'Test2'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(201);
          res.body.message.should.equal('New question created successfully!');
          done();
        });
    });

    it('Create hard question', (done) => {
      chai.request(app)
        .post('/api/question' + '/hard')
        .send({ id: 3, title: 'Test3', body: 'Test3'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(201);
          res.body.message.should.equal('New question created successfully!');
          done();
      });
    })

    it('Create question that exist', (done) => {
      chai.request(app)
      .post('/api/question' + '/easy')
      .send({ id: 1, title: 'Test1', body: 'Test1'})
      .end((err, res) => {
        chai.expect(err).to.be.null;
        res.should.have.status(400);
        res.body.message.should.equal('Could not create a new question!');
        done();
      });
    });

    it('Should not create question with missing parameter', (done) => {
      chai.request(app)
        .post('/api/question' + '/easy')
        .send({})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(400);
          done();
        });
    });
  })

  describe('Get question', () => {
    it('Get easy question', (done) => {
      chai.request(app)
        .get('/api/question' + '/easy' + '/1')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.id.should.equal(1);
          done();
        });
    });

    it('Get medium question', (done) => {
      chai.request(app)
        .get('/api/question' + '/medium' + '/2')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.id.should.equal(2);
          done();
        });
    });

    it('Get hard question', (done) => {
      chai.request(app)
        .get('/api/question' + '/hard' + '/3')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.id.should.equal(3);
          done();
      });
    })

    it('Get nonexistent question', (done) => {
      chai.request(app)
        .get('/api/question' + '/easy' + '/5')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(400);
          res.body.message.should.equal('Could not retrieve question!');
          done();
        });
    });
  })

  describe('Get random question', () => {
    const uuid ='/97ff2c02-da69-4dca-abf3-fb218f708283'
    it('Get random easy question', (done) => {
      chai.request(app)
        .get('/api/question' + '/random' + '/easy' + uuid)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.id.should.equal(1);
          done();
        });
    });

    it('Get random medium question', (done) => {
      chai.request(app)
        .get('/api/question' + '/random' + '/medium' + uuid)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.id.should.equal(2);
          done();
        });
    });

    it('Get random hard question', (done) => {
      chai.request(app)
        .get('/api/question' + '/random' + '/hard' + uuid)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.id.should.equal(3);
          done();
      });
    })
  })

  describe('Delete question', () => {
    it('Delete easy question', (done) => {
      chai.request(app)
        .delete('/api/question' + '/easy' + '/1')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('Question deleted successfully!');
          done();
        });
    });

    it('Delete medium question', (done) => {
      chai.request(app)
        .delete('/api/question' + '/medium' + '/2')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('Question deleted successfully!');
          done();
        });
    });

    it('Delete hard question', (done) => {
      chai.request(app)
        .delete('/api/question' + '/hard' + '/3')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('Question deleted successfully!');
          done();
      });
    })
  })
});