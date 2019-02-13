var opentracing = require("opentracing");
var lightstep = require("lightstep-tracer");

module.exports.initTracer = serviceName => {
  opentracing.initGlobalTracer(new lightstep.Tracer({
        'collector_host': 'localhost',
        'collector_port': 8360
  }));
};
