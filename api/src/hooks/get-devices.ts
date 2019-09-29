// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { getDevices } from '../cast';

export default (_options = {}): Hook => {
  return async (context: HookContext) => {
    context.data = getDevices();

    // Best practice: hooks should always return the context
    return context;
  };
};
