import ChromecastAPI from 'chromecast-api';
import logger from '../logger';

type CastDevice = {
  config: { name: string; addresses: string[] };
  host: string;
  play: (resource: string, seconds: number, callback: () => void) => void;
  pause: (callback: () => void) => void;
  stop: (callback: () => void) => void;
  close: (callback: () => void) => void;
};

const devices: CastDevice[] = [];

export function getDevices(): CastDevice[] {
  return devices;
}

export function getDeviceHosts(): { host: string; name: string }[] {
  return devices.map((device: CastDevice) => ({
    host: device.host,
    name: device.config.name
  }));
}

export function getDevice(host: string): CastDevice | undefined {
  return devices.find((device: CastDevice) => device.host === host);
}

export function castToDevice(device: CastDevice, url: string) {
  logger.info(
    'Cast - %s (%s) - Play: %s',
    device.config.name,
    device.host,
    url
  );
  device.play(url, 0, function() {
    logger.info('Cast - Playing');
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
