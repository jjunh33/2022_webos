// eslint-disable-next-line import/no-unresolved
const pkgInfo = require('./package.json');
const Service = require('webos-service');

const service = new Service(pkgInfo.name); // Create service by service name on package.json
const logHeader = "[" + pkgInfo.name + "]";

// 등록되고 다른 어플리케이션에서 실행하는 예제
service.register("hello", (message)=> {
    console.log("hi");
    console.log(message);

    const name = message.payload.name ? message.payload.name : "COSMOS";

    message.respond({
        returnValue: true,
        Response: "Hello, " + name + "!"
    });
});

// call another service
service.register("toast", (msg)=> {
    console.log("hi");
    console.log(msg);

    service.call("luna://com.webos.notification/createToast", {message:"hello"}, function(m2) {
        console.log(logHeader, "SERVICE_METHOD_CALLED:com.webos.notification/createToast");
        msg.respond({
            returnValue: true,
            Response: JSON.stringify(m2.payload)
        });
    });
});