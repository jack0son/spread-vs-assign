const Benchmark = require("benchmark");

const suite = new Benchmark.Suite();

const obj = { foo: 1, bar: 2 };

const makeObject = (numProps, start = 0) =>
  [...Array(NUM_PROPS)].reduce((o, _, i) => ({ ...o, [i + start]: i }), {});

const NUM_PROPS = 52;
const obj_a = makeObject(NUM_PROPS);
const obj_b = makeObject(NUM_PROPS, NUM_PROPS);
const obj_c = makeObject(NUM_PROPS);
const obj_d = makeObject(NUM_PROPS, NUM_PROPS / 2);

suite
  .add("Object spread", function() {
    ({ ...obj_a, ...obj_b });
  })
  .add("Object.assign()", function() {
    Object.assign(obj_a, obj_b);
  })
  .add("Object spread - 50% collision", function() {
    ({ ...obj_c, ...obj_d });
  })
  .add("Object.assign() - 50% collision", function() {
    Object.assign(obj_c, obj_d);
  })
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });

suite;
