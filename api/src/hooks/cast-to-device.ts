// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { castToDevice, getDevice } from '../cast';

export default (_options = {}): Hook => {
  return async (context: HookContext) => {
    const { data } = context;
    let { host, url } = data;

    if (!host) throw new Error('No host specified.');
    if (!url) throw new Error('No url specified.');

    const device = getDevice(data.device);
    if (!device) throw new Error('Device not found.');

    castToDevice(device, data.url);

    return context;
  };
};
