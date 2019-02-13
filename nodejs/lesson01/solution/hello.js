const assert = require("assert");
const { initTracer } = require("../../lib/tracing");
var opentracing = require("opentracing");
var lightstep = require("lightstep-tracer");

const tracer = new lightstep.Tracer({
      collector_host: 'localhost',
      collector_port: 9001,
      component_name: 'say-hello',
      access_token: 'token',
      collector_encryption: 'none'
});

const sayHello = helloTo => {
  const span = tracer.startSpan("say-hello");
  span.setTag("hello-to", helloTo);
  const helloStr = `Hello, ${helloTo}!`;
  span.log({
    key: "important",
    event: "string-format",
    value: helloStr,
  });
  console.log(helloStr);
  span.log({ event: "print-string" });
  span.finish();
  tracer.flush();
};

assert(process.argv.length == 3, "Expecting one argument");
const helloTo = process.argv[2];

sayHello(helloTo);

setTimeout(() => {process.exit()}, 1000);
