// const { Router } = require('Express');
import { Router } from 'express';
// import User from './app/models/User';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AppSessionController from './app/controllers/AppSessionController';
import FileController from './app/controllers/FileController';
// import ProviderController from './app/controllers/ProviderController';
// import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
// import AvailableController from './app/controllers/AvailableController';

import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import SignatureController from './app/controllers/SignatureController';
import DeliveryPickerController from './app/controllers/DeliveryPickerController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
// import validateAppointmentStore from './app/validators/AppointmentStore;';

import validateRecipientStore from './app/validators/RecipientStore';
import validateRecipientUpdate from './app/validators/RecipientUpdate';
import validateDeliverymanStore from './app/validators/DeliverymanStore';
import validateDeliverymanUpdate from './app/validators/DeliverymanUpdate';
import validateDeliveryStore from './app/validators/DeliveryStore';
import validateDeliveryUpdate from './app/validators/DeliveryUpdate';
import validateDeliveryProblemStore from './app/validators/DeliveryProblemStore';
import validateDeliveryProblemUpdate from './app/validators/DeliveryProblemUpdate';
import validateDeliveryPickerStore from './app/validators/DeliveryPickerStore';
import validateDeliveryPickerUpdate from './app/validators/DeliveryPickerUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// routes.post('/users', UserController.store);
// routes.post('/sessions', SessionController.store);
routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/appsessions', AppSessionController.store);

routes.use(authMiddleware);

// routes.put('/users', UserController.update);
routes.put('/users', validateUserUpdate, UserController.update);

// routes.get('/providers', ProviderController.index);
// routes.get('/providers:/providerId/available', AvailableController.index);

// routes.get('/appointments', AppointmentController.index);
// routes.post('/appointments', AppointmentController.store);
/*
routes.post(
  '/appointments',
  validateAppointmentStore,
  AppointmentController.store
);
*/
// routes.delete('/appointments/:id', AppointmentController.delete);

// routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post(
  '/deliverymans',
  validateDeliverymanStore,
  DeliverymanController.store
);
routes.get('/deliverymans', DeliverymanController.index);
routes.get('/deliverymans/:id', DeliverymanController.show);
routes.put(
  '/deliverymans/:id',
  validateDeliverymanUpdate,
  DeliverymanController.update
);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.post('/delivery', validateDeliveryStore, DeliveryController.store);
routes.put('/delivery/:id', validateDeliveryUpdate, DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);
routes.get('/delivery', DeliveryController.index);
// routes.get('/delivery', DeliveryController.show);

// routes.get('/deliverymans/:id/deliveries', DeliveryController.index);
// routes.get('/deliverymans/:id/deliveries', DeliveryController.show);
routes.get('/deliverymans/:id/picks', DeliveryPickerController.index);
routes.get('/deliverymans/:id/deliveries', DeliveryPickerController.show);

routes.post(
  '/delivery/:id/problems',
  validateDeliveryProblemStore,
  DeliveryProblemController.store
);

routes.put(
  '/delivery/:id/problems',
  validateDeliveryProblemUpdate,
  DeliveryProblemController.update
);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.delete('/delivery/:id/problems', DeliveryProblemController.delete);

routes.delete('/problem/:id/cancel-delivery', DeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/signatures', upload.single('file'), SignatureController.store);
/*
routes.post(
  '/delivery-picker/:id',
  validateDeliveryPickerStore,
  DeliveryPickerController.store
);
*/
routes.post(
  '/delivery-picker',
  validateDeliveryPickerStore,
  DeliveryPickerController.store
);
routes.put(
  '/delivery-picker',
  validateDeliveryPickerUpdate,
  DeliveryPickerController.update
);

routes.delete('/delivery-picker/:id', DeliveryPickerController.delete);

// module.exports = routes;
export default routes;
