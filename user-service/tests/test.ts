import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { createAccessToken } from "../model/auth";
import UserModel from '../model/user-model';

chai.use(chaiHttp);
chai.should();

describe('/api/user', () => {
  describe('Create account', () => {
    it('Should not create account with missing parameter', (done) => {
      chai.request(app)
        .post('/api/user')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(400);
          res.body.message.should.equal('Password does not meet the requirement!');
          done();
        });
    });
  
    it('Should create account', (done) => {
      chai.request(app)
        .post('/api/user')
        .send({ username: 'testing1234', password: 'Testing1234'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(201);
          res.body.message.should.equal('New user created successfully!');
          done();
        });
    });
  });

  describe('Login account', () => {
    it('Should not login to invalid account', (done) => {
      chai.request(app)
        .post('/api/user/login')
        .send({ username: 'asdasafdsdfsd', password: 'Tsdfsddfdsf1234'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(400);
          res.body.message.should.equal('Username and/or Password are wrong!');
          done();
        });
    });
  
    it('Should login to account', (done) => {
      chai.request(app)
        .post('/api/user/login')
        .send({ username: 'testing1234', password: 'Testing1234'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('Login successfully!');
          done();
        });
    });
  });

  describe('Delete account', () => {
    const token1 = createAccessToken(new UserModel({username: 'randomddaaaa', pHash: 'randommmm', session: 'randommm'}));
    it('Should not delete invalid account', (done) => {
      chai.request(app)
        .delete('/api/user')
        .set('Cookie', 'access_token=' + token1)
        .send({ username: 'asdasafdsdfsd', password: 'Tsdfsddfdsf1234'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(500);
          res.body.message.should.equal('Database failure!');
          done();
        });
    });

    const token2 = createAccessToken(new UserModel({username: 'testing1234', pHash: 'randommmm', session: 'randommm'}));
    it('Should delete account', (done) => {
      chai.request(app)
        .delete('/api/user')
        .set('Cookie', 'access_token=' + token2)
        .send({ username: 'testing1234', password: 'Testing1234'})
        .end((err, res) => {
          chai.expect(err).to.be.null;
          res.should.have.status(200);
          res.body.message.should.equal('User deleted successfully!');
          done();
        });
    });
  })
});