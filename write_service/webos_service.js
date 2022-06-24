// eslint-disable-next-line import/no-unresolved
const pkgInfo = require('./package.json');
const Service = require('webos-service');

const service = new Service(pkgInfo.name); // Create service by service name on package.json
const logHeader = "[" + pkgInfo.name + "]";

const fs = require('fs');

service.register("writeFile", function(message) {
    fs.writeFileSync('/media/internal/foobar.txt', 'sample text', "utf8");
    message.respond({
        reply: "write complete"
    });
});
