module.exports = (server, chai) => {

    describe('Feedback Routes:', () => {

        describe('/api/feedback/getall', () => {
            it('it should GET all Feedback', (done) => {
                chai.request(server)
                    .get('/api/feedback/getall')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });

        describe('/api/feedback/create', () => {
            it('it should not POST feedback without a body', (done) => {
                let feedback = {
                    subject: 'Test',
                };
                chai.request(server)
                    .post('/api/feedback/create')
                    .send(feedback)
                    .end((err, res) => {
                        console.log(res.body);
                        res.should.have.status(400);
                        // res.body.should.be.a('object');
                        // res.body.should.have.property('message');
                        // res.body.message.should.have.property('body');
                        // res.body.errors.body.should.have.property('kind').eql('required');
                        done();
                    });
            });

        });
    });
};