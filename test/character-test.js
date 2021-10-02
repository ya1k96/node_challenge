let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api';

describe('Characters',()=>{
    it('Get with status 200', (done) => {
        chai.request(url)
        .get('/characters')
        .end( function(err, res){            
            expect(res).to.have.status(200);            
            done();
        });
    });
    
    it('Insert one character', (done) => {
        chai.request(url)
        .post('/characters')
        .send({img: "npm.jpg", name: "Yamil", age: 30, history: "welcome to usa", weight: 80})
        .end( function(err, res){            
            expect(res).to.have.status(200)          
            done();
        });
    });

    it('Error to insert one empty character', (done) => {
        chai.request(url)
        .post('/characters')       
        .end( function(err, res){            
            expect(res).to.have.status(400)          
            done();
        });
    });

    //for each test increment +1
    it('Delete one character', (done) => {
        chai.request(url)
        .delete('/characters/19')        
        .end( function(err, res){            
            expect(res).to.have.status(200)           
            done();
        });
    });

    it('Get a list', (done) => {
        chai.request(url)
        .get('/characters')
        .end( function(err, res){            
            expect(res.body).to.have.lengthOf(2)            
            done();
        });
    });
});