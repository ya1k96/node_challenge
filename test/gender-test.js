let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe('Gender',() => {
    it('Get with status 200', (done) => {
        chai.request(url)
        .get('/gender')
        .end( function(err, res){            
            expect(res).to.have.status(200);            
            done();
        });
    });
    
    it('Insert one gender', (done) => {
        chai.request(url)
        .post('/gender')
        .send({img: "sci-fi.jpg", name: "SCI-FI"})
        .end( function(err, res){                       
            expect(res).to.have.status(200)          
            done();
        });
    });
    
    it('Delete one gender', (done) => {
        chai.request(url)
        .delete('/gender/1')        
        .end( function(err, res){            
            expect(res).to.have.status(200)           
            done();
        });
    });

    it('Get a list', (done) => {
        chai.request(url)
        .get('/gender')
        .end( function(err, res){            
            expect(res.body).to.have.lengthOf(1)            
            done();
        });
    });
});