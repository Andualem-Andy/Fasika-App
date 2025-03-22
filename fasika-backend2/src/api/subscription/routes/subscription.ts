/**
 * subscription router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::subscription.subscription');
'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/subscriptions',
      handler: 'subscription.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};