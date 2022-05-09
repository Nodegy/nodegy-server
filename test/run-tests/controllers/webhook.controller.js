module.exports = (server, chai) => {
    const header = { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDdmYjgwN2ZhMDJmNTA3NDkxNjZiZSIsImlhdCI6MTYzMjI2NjM1MCwiZXhwIjoxNjMyMzUyNzUwfQ.2Vub0PepWLGdafzs-Jprn2VJATObR_SFl_r-31r8fow' };
    describe('Webhook Routes:', () => {

        describe('/api/webhooks/getall', () => {
            it('it should GET all Webhooks', (done) => {
                chai.request(server)
                    .get('/api/webhooks/getall', headers = header)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });
    });
};