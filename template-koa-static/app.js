const serve = require("koa-static");
const path = require("path");
const Koa = require("koa");
const args = require('minimist')(process.argv.slice(2))
const app = new Koa();

const port = args['p'] || args['port'] || 3000;

app.use(serve(path.resolve(__dirname, "public")));

app.use(async (ctx) => {
  ctx.body = `serve public dir on ${port}`;
});

app.listen(port);

console.log(`listening on port ${port}`);
