import app from '../index.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import difficulties from "../model/difficulties.js";
import mongoose from 'mongoose';
import recordModel from '../model/record-model.js';


chai.use(chaiHttp);
chai.should();

describe('/api/record', () => {
  after((done) => {
    recordModel.deleteMany({}, () => {
      done();
    })
  });

  const validRecord = {
    user_id: new mongoose.Types.ObjectId(), 
    partner_username: 'test1234', 
    question_difficulty: difficulties.EASY, 
    question_id: 1234,
    question_title: 'test', 
    code: 'test', 
    timestamp: (new Date()).toISOString()
  };

  const invalidRecord = {
    user_id: new mongoose.Types.ObjectId(), 
    partner_username: 'test1234', 
    question_difficulty: 'random', 
    question_id: 1234,
    question_title: 'test', 
    code: 'test', 
    timestamp: (new Date()).toISOString()
  };

  describe('Create new record',() => {
    it('Should not create record', (done) => {
      chai.request(app)
        .post('/api/record')
        .send(invalidRecord)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(400);
          done();
        });
    });

    it('Should create record', (done) => {
      chai.request(app)
        .post('/api/record')
        .send(validRecord)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(201);
          res.body.message.should.equal('New record created successfully!');
          done();
        });
    });
  });

  describe('Get record', () => {
    it('Should get empty record for invalid user id', (done) => {
      chai.request(app)
        .get('/api/record/' + invalidRecord.user_id.toString())
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.records.length.should.equal(0);
          done();
        });
    });

    it('Should get record for valid user id', (done) => {
      chai.request(app)
        .get('/api/record/' + validRecord.user_id.toString())
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.records.length.should.equal(1);
          res.body.records[0].timestamp.should.equal(validRecord.timestamp);
          done();
        });
    });
  });

  describe('Delete record', () => {
    it('Should delete records', (done) => {
      chai.request(app)
        .delete('/api/record/' + validRecord.user_id.toString())
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
        })
      chai.request(app)
        .get('/api/record/' + invalidRecord.user_id.toString())
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.records.length.should.equal(0);
          done();
        })
    });
  });
});