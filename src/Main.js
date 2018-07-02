import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Skycons from 'react-skycons';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  header: {
    display: 'block',
    width: '100%',
    height: 160,
  },
  timeDateContainer: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  time: {
    textAlign: 'center',
    color: theme.palette.defaultText.main,
    fontSize: '6rem',
  },
  timePeriod: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: '3rem',
  },
  date: {
    color: theme.palette.defaultText.main,
    marginTop: theme.spacing.unit * -2.5,
  },
  weatherContainer: {
    position: 'fixed',
    top: 80,
    left: 0,
    transform: 'translateY(-50%)',
    textAlign: 'left',
  },
  weather: {
    paddingLeft: theme.spacing.unit * 15,
    color: theme.palette.defaultText.main,
    fontSize: '3.2rem',
  },
  weatherIcon: {
    position: 'fixed',
    transform: 'translateX(-136px)',
    width: '190px !important',
    height: '90px !important',
  },
  temperature: {
    paddingLeft: theme.spacing.unit * 15,
    color: theme.palette.defaultText.main,
    fontSize: '2.0rem',
  },
  humidity: {
    paddingLeft: theme.spacing.unit * 4,
  },
  indoorContainer: {
    position: 'fixed',
    top: 84,
    right: 0,
    transform: 'translateY(-50%)',
    textAlign: 'right',
  },
  indoor: {
    minWidth: 200,
    paddingRight: theme.spacing.unit * 12,
    color: theme.palette.defaultText.main,
    fontSize: '2.0rem',
  },
  gridContainer: {
    height: `calc(100% - 153px)`,
    overflowY: 'auto',
  },
  grid: {
    height: '100%',
    width: 'fit-content',
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    flexWrap: 'nowrap',
  },
  group: {
    height: `calc(100% + ${theme.spacing.unit}px)`,
    width: '18rem',
    overflow: 'hidden',
  },
  title: {
    color: theme.palette.defaultText.light,
  },
  gridInnerContainer: {
    height: `calc(100% - ${theme.spacing.unit * 6}px)`,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  gridInner: {
    width: '100%',
  },
  cardContainer: {
    position: 'relative',
    width: '50%',
    padding: theme.spacing.unit / 2,
  },
  card: {
    minHeight: '8rem',
    height: '100%',
  },
  cardOn: {
    backgroundColor: theme.palette.backgrounds.dark,
  },
  cardContent: {
    height: '100%',
    padding: theme.spacing.unit * 2,
  },
  name: {
    fontSize: '1.2rem',
  },
  state: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    fontSize: '0.9rem',
  },
});

const items = [
  {
    name: 'Scenes',
    cards: [
      {
        name: 'Reset Lights',
        entity_id: 'scene.reset_lights',
      },
      {
        name: 'Reset Kitchen Lights',
        entity_id: 'scene.reset_kitchen_lights',
      },
      {
        name: 'Lights on',
        entity_id: 'scene.lights_on',
      },
      {
        name: 'Lights off',
        entity_id: 'scene.lights_off',
      },
      {
        name: 'All Lights on',
        entity_id: 'scene.all_lights_on',
      },
      {
        name: 'Night Mode',
        entity_id: 'scene.night_mode',
      },
    ]
  },
  {
    name: 'Living Room',
    cards: [
      {
        name: 'Setee Light',
        entity_id: 'light.setee_light',
      },
      {
        name: 'TV Light',
        entity_id: 'light.tv_light',
      },
      {
        name: 'PC Light',
        entity_id: 'light.pc_light',
      },
      {
        name: 'Floor Lights',
        entity_id: 'light.floor_lights',
      },
      {
        name: 'Crystal Lights',
        entity_id: 'light.crystal_lights',
      },

    ]
  },
  {
    name: 'Dining Room',
    cards: [
      {
        name: 'Table Light',
        entity_id: 'light.table_light',
      },
    ]
  },
  {
    name: 'Desk',
    cards: [
      {
        name: 'Desk Lights',
        entity_id: 'light.desk_lights',
      },
      {
        name: 'Matrix Clock',
        entity_id: 'light.matrix_clock',
      },
    ]
  },
  {
    name: 'Kitchen',
    cards: [
      {
        name: 'Kettle Light',
        entity_id: 'light.kettle_light',
      },
      {
        name: 'Table Light',
        entity_id: 'light.table_light',
      },
      {
        name: 'Toaster Light',
        entity_id: 'light.toaster_light',
      },
      {
        name: 'Ceiling Light',
        entity_id: 'light.ceiling_light',
      },
      {
        name: 'Under Bar Light',
        entity_id: 'light.under_bar_light',
      },
      {
        name: 'Bar Light',
        entity_id: 'switch.sonoff_002_plug',
      },
      {
        name: 'Jar Lights',
        entity_id: 'light.jar_lights',
      },
    ]
  },
  {
    name: 'Outside',
    cards: [
      {
        name: 'Fountain',
        entity_id: 'switch.sonoff_006_plug',
      },
    ]
  },

];

class Main extends React.Component {

  getState = (entities, entity, endAdornment = '') => {
    const state = entities.find(i => {
      return i[1].entity_id === entity;
    })[1].state;
    return !state || state === 'unknown' ? '' : state + endAdornment;
  };

  render() {
    const { classes, entities, theme, handleChange } = this.props;

    const weatherIcon = this.getState(entities, 'sensor.dark_sky_icon').replace('-', '_').toUpperCase();
    const weather = this.getState(entities, 'sensor.pws_weather');
    const temperature = this.getState(entities, 'sensor.pws_temp_c', '°C');
    const humidity = this.getState(entities, 'sensor.pws_relative_humidity', '%');
    const temperatureIndoor = this.getState(entities, 'sensor.dht22_01_temperature', '°C');
    const humidityIndoor = this.getState(entities, 'sensor.dht22_01_humidity', '%');

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.weatherContainer}>
            <Typography className={classes.weather} variant="display2">
              <Skycons
                className={classes.weatherIcon}
                color={theme.palette.defaultText.main}
                icon={weatherIcon}
                autoplay={true} />
              {weather}
            </Typography>
            <Typography className={classes.temperature} variant="display2">
              {temperature}
              <span className={classes.humidity}>{humidity}</span>
            </Typography>
          </div>
          <div className={classes.timeDateContainer}>
            <Typography className={classes.time} variant="display4">
              <Moment format="hh:mm" />
              <Moment className={classes.timePeriod} format="a" />
            </Typography>
            <Typography className={classes.date} variant="display2">
              <Moment format="Do MMMM YYYY" />
            </Typography>
          </div>
          <div className={classes.indoorContainer}>
            <Typography className={classes.indoor} variant="display2">
              {temperatureIndoor}
            </Typography>
            <Typography className={classes.indoor} variant="display2">
              {humidityIndoor}
            </Typography>
          </div>
        </div>
        <div className={classes.gridContainer}>
          <Grid
            container
            className={classes.grid}
            spacing={16}>
            {items && items.map((group, x) => {
              return (
                <Grid key={x} className={classes.group} item>
                  <Typography className={classes.title} variant="display1" gutterBottom>
                    {group.name}
                  </Typography>
                  <div className={classes.gridInnerContainer}>
                    <Grid
                      container
                      className={classes.gridInner}
                      alignItems="stretch">
                      {group.cards.map((card, y) => {
                        const { entity_id, state, /*attributes*/ } =
                          entities.find(i => { return i[1].entity_id === card.entity_id })[1];
                        const domain = entity_id.substring(0, entity_id.indexOf('.'));
                        return (
                          <Grid key={y} className={classes.cardContainer} item>
                            <Card className={classnames(
                              classes.card,
                              state === 'on' ? classes.cardOn : classes.cardOff
                            )} elevation={1} onClick={() => {
                              if (domain === 'light' || domain === 'switch')
                                handleChange(domain, state === 'on' ? false : true, { entity_id });
                              else if (domain === 'scene' || domain === 'script')
                                handleChange(domain, true, { entity_id });
                            }}>
                              <CardContent className={classes.cardContent}>
                                <Typography className={classes.name} variant="headline">
                                  {card.name}
                                </Typography>
                                {domain === 'sensor' &&
                                  <Typography className={classes.state} variant="body1">
                                    {state}
                                  </Typography>
                                }
                              </CardContent>
                            </Card>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </div>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  entities: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Main);
