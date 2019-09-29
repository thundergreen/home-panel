import ChromecastAPI from 'chromecast-api';
import logger from '../logger';

type CastDevice = {
  config: { name: string; addresses: string[] };
  host: string;
  close: (arg0: () => void) => void;
  pause: (arg0: () => void) => void;
  play: (arg0: string, arg1: number, arg2: () => void) => void;
  stop: (arg0: () => void) => void;
};

const devices: CastDevice[] = [];

export function getDevices(): CastDevice[] {
  return devices;
}

export function getDevice(host: string): CastDevice | undefined {
  return devices.find((device: CastDevice) => device.host === host);
}

export function castToDevice(device: CastDevice, url: string) {
  device.play(url, 0, function() {
    logger.info('Cast - Playing in your chromecast');

    setTimeout(function() {
      //Pause the video
      device.pause(function() {
        logger.info('Cast - Paused');
      });
    }, 20000);

    setTimeout(function() {
      //Stop video
      device.stop(function() {
        logger.info('Cast - Stopped');
      });
    }, 30000);

    setTimeout(function() {
      //Close the streaming
      device.close(function() {
        logger.info('Cast - Closed');
      });
    }, 40000);
  });
}

export default function() {
  let browser = new ChromecastAPI.Browser();

  browser.on('deviceOn', (device: CastDevice) => {
    logger.info('Cast - Found %s (%s)', device.config.name, device.host);

    if (
      !devices.find((existingDevice: CastDevice) => existingDevice === device)
    )
      devices.push(device);
  });
}
