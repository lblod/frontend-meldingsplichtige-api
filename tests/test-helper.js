import Application from 'frontend-meldingsplichtige-api/app';
import config from 'frontend-meldingsplichtige-api/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
