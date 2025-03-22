'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::subscription.subscription', ({ strapi }) => ({
  async create(ctx) {
    try {
      console.log('Request Body:', ctx.request.body); // Debugging: Log the entire request body

      // Check if the request body is undefined or missing the data property
      if (!ctx.request.body || !ctx.request.body.data) {
        console.error('Invalid request payload:', ctx.request.body);
        return ctx.badRequest('Invalid request payload. Expected { data: { email } }');
      }

      const { email } = ctx.request.body.data;

      console.log('Received Payload:', { email }); // Debugging: Log the payload

      // Check if the email already exists
      try {
        const existingSubscription = await strapi.db.query('api::subscription.subscription').findOne({
          where: { email },
        });

        if (existingSubscription) {
          console.log('Duplicate email detected:', email);
          return ctx.badRequest('This email is already subscribed.');
        }
      } catch (error) {
        console.error('Error checking for duplicate email:', error);
        return ctx.badRequest('Failed to check for duplicate email. Please try again.');
      }

      // Send a welcome email to the subscriber
      try {
        await strapi.service('api::subscription.subscription').sendEmail(
          email, // Subscriber's email
          'Welcome to Fasika Preschool and International Childcare Center!', // Email subject
        'Thank you for subscribing to the Fasika Preschool and International Childcare Center newsletter. We’re excited to keep you updated on our programs, events, and news!', // Plain text body
        `<h1>Welcome to Fasika Preschool and International Childcare Center!</h1>
         <p>Thank you for subscribing to our newsletter. We’re excited to keep you updated on our programs, events, and news.</p>
         <p>Stay tuned for the latest updates and insights from our team!</p>
         <p>Best regards,</p>
         <p><strong>The Fasika Preschool Team</strong></p>`
        );
        console.log('Welcome email sent to:', email);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // You can choose to log the error and continue without failing the subscription
      }

      // Save the subscription
      try {
        const subscription = await strapi.entityService.create('api::subscription.subscription', {
          data: { email },
        });
        console.log('Subscription created:', subscription); // Debugging: Log the created subscription
        return subscription;
      } catch (error) {
        console.error('Subscription creation failed:', error);
        return ctx.internalServerError('Failed to create subscription. Please try again.');
      }
    } catch (error) {
      console.error('Error in create controller:', error);
      return ctx.internalServerError('Failed to create subscription. Please try again.');
    }
  },
}));