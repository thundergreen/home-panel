// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

export type CastDevice = {
  host: string;
  name: string;
};

interface CastDevicesProps {
  devices: CastDevice[];
  handleChosen: (host: string, url: string) => void;
}

function CastDevices(props: CastDevicesProps) {
  const [url, setUrl] = React.useState(window.location.href);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.target.value);
  }

  const handleChosen = (device: CastDevice) => (_event: any) => {
    props.handleChosen(device.host, url);
  };

  return (
    <Dialog open>
      <DialogTitle>Select device</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="URL"
          placeholder="https://timmo.dev/home-panel"
          value={url}
          onChange={handleChange}
        />
      </DialogContent>
      <List>
        {props.devices.map((device: CastDevice, key: number) => (
          <ListItem key={key} button onClick={handleChosen(device)}>
            <ListItemText primary={`${device.name} (${device.host})`} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

CastDevices.propTypes = {
  devices: PropTypes.any.isRequired,
  handleChosen: PropTypes.func.isRequired
};

export default CastDevices;
