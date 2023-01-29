"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _ClassResume = require('../models/ClassResume'); var _ClassResume2 = _interopRequireDefault(_ClassResume);
var _ContentClasses = require('../models/ContentClasses'); var _ContentClasses2 = _interopRequireDefault(_ContentClasses);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _Notes = require('../models/Notes'); var _Notes2 = _interopRequireDefault(_Notes);
var _QuizContent = require('../models/QuizContent'); var _QuizContent2 = _interopRequireDefault(_QuizContent);
var _QuizQuestion = require('../models/QuizQuestion'); var _QuizQuestion2 = _interopRequireDefault(_QuizQuestion);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

const models = [_User2.default, _Foto2.default, _QuizContent2.default, _QuizQuestion2.default, _Notes2.default, _ContentClasses2.default, _ClassResume2.default];
const connection = new (0, _sequelize2.default)(_database2.default);
models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

