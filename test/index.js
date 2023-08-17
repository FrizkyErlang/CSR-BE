const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

let itemId = '';

describe('POST /api/v1/bootcamp', () => {
    it('Enter a new item on the to do list', (done) =>{
        chai.request(app)
        .post('/api/v1/bootcamp')
        .set('Content-type', 'application/json')
        .send({
            text: "Write a unit test",
            isCompleted: false
        })
        .end((err,res) => {
            if(err){
                return done(err);
            } else {
                res.should.have.status(200);
                itemId = res.body._id
                return done()
            }
        });
    });
})

describe('GET /api/v1/bootcamp', () => {
    it('get every item on the to do list', (done) =>{
        chai.request(app)
        .get('/api/v1/bootcamp')
        .set('Content-type', 'application/json')
        .end((err,res) => {
            if(err){
                return done(err);
            } else {
                res.should.have.status(200);
                return done()
            }
        });
    });
})

describe('GET /api/v1/bootcamp/{id}', (done) => {
    it('get specific item on the to do list through ID', (done) => {
        chai.request(app)
        .get('/api/v1/bootcamp/' + itemId)
        .set('Content-type', 'application/json')
        .end((err,res) => {
            if(err){
                return done(err);
            } else {
                res.should.have.status(200);
                return done()
            }
        });
    });
})

describe('PUT /api/v1/bootcamp/{id}', (done) => {
    it('update an item on the to do list through ID', (done) => {
        chai.request(app)
        .put('/api/v1/bootcamp/' + itemId)
        .set('Content-type', 'application/json')
        .send({
            text: "Write complete unit tests",
            isCompleted: true
        })
        .end((err,res) => {
            if(err){
                return done(err);
            } else {
                res.should.have.status(200);
                return done()
            }
        });
    });
})

describe('DELETE /api/v1/bootcamp/{id}', (done) => {
    it('delete an item on the to do list through ID', (done) => {
        chai.request(app)
        .delete('/api/v1/bootcamp/' + itemId)
        .set('Content-type', 'application/json')
        .end((err,res) => {
            if(err){
                return done(err);
            } else {
                res.should.have.status(200);
                return done()
            }
        });
    });
})