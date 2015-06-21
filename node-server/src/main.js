/**
 * Created by aarutunyan on 3/18/15.
 */
var ex = require('express'),
  consts = require('./resources/const'),
  serverExpress = require('./server-express'),
  _ = require('underscore');
  //dbEntities = require('./entities/01_data/db'),
  //businessEntities = require('./entities/02_business/main'),
  //presentationEntities = require('./entities/03_presentation/rest');
global._ = _;
global.const = consts;
global.config = {
  root: process.cwd(),
  serverPath: process.cwd().substring(0, process.cwd().lastIndexOf('/'))
}
serverExpress.start();

