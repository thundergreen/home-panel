// Initializes the `cast` service on path `/cast`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Cast } from './cast.class';
import hooks from './cast.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    cast: Cast & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/cast', new Cast(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cast');

  service.hooks(hooks);
}
