## skills-to-pptcv-webpart

A WebPart that allows one to search for a User and generate
a Curriculum Vitae based on a Skill List stored on Sharepoint.

The CV is generated as a PPT on the client-side.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

* gulp trust-dev-cert //Enables dev SSL Certs at localhost
* gulp clean - TODO
* gulp test - NOT WORKING
* NODE_NO_HTTP2=1 gulp serve //Allows serving content 
through SSL with latest NodeJS
* gulp bundle - TODO
* gulp package-solution - TODO

### Unit Tests
Tests are located at src/webparts/skillsToPptCv/components/tests/

Run from the CMD Line: `mocha -r ts-node/register src/**/*test.ts`

Coverage is provided by NYC.

