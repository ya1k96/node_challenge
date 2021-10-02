let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe('Movies',() => {
    it('Get with status 200', (done) => {
        chai.request(url)
        .get('/movies')
        .end( function(err, res){            
            expect(res).to.have.status(200);            
            done();
        });
    });
    
    it('Insert one movie', (done) => {
        chai.request(url)
        .post('/movies')
        .send({img: "npm.jpg", title: "Yamil"})
        .end( function(err, res){           
            console.log(res.body) 
            expect(res).to.have.status(200)          
            done();
        });
    });

    //for each test increment +1
    it('Delete one movie', (done) => {
        chai.request(url)
        .delete('/movies/8')        
        .end( function(err, res){            
            expect(res).to.have.status(200)           
            done();
        });
    });

    it('Get a list', (done) => {
        chai.request(url)
        .get('/movies')
        .end( function(err, res){            
            expect(res.body).to.have.lengthOf(1)            
            done();
        });
    });
});