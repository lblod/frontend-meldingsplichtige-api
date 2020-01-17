import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async showTriples(row) {
      const submittedResource = await row.submittedResource;
      const url = `http://localhost:8890/sparql?default-graph-uri=&query=SELECT+*+WHERE+%7B%0D%0A++%3C${submittedResource.uri}%3E+%3Fp+%3Fo%0D%0A%7D&should-sponge=&format=text%2Fhtml&timeout=0&debug=on`;
      window.location = url;
    }
  }
});
