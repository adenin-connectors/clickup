'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const decache = require('decache');
const logger = require('@adenin/cf-logger');

const app = new Koa();
const router = new Router();

const PORT = 4000;

let index = require('./index');

router.post('/:activity', async (ctx) => {
    if (process.env.NODE_ENV === 'development') {
        logger.debug('Decaching...');

        decache('./index');
        index = require('./index');
    }

    await index.activities(ctx);
});

app
    .use(bodyParser())
    .use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = {
                error: err.message
            };

            ctx.app.emit('error', err, ctx);
        }
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .on('error', (err) => {
        logger.error(err);
    })
    .listen(PORT);

logger.info('Server running on port ' + PORT);
