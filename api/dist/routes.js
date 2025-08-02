"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Foto = require('./controllers/Foto'); var FotoController = _interopRequireWildcard(_Foto);
var _TokenController = require('./controllers/TokenController'); var TokenController = _interopRequireWildcard(_TokenController);
var _QuizContent = require('./controllers/QuizContent'); var QuizContentController = _interopRequireWildcard(_QuizContent);
var _QuizQuestions = require('./controllers/QuizQuestions'); var QuizQuestionController = _interopRequireWildcard(_QuizQuestions);
var _User = require('./controllers/User'); var user = _interopRequireWildcard(_User);
var _loginRequired = require('./middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _Notes = require('./controllers/Notes'); var notesController = _interopRequireWildcard(_Notes);
var _ContentClasses = require('./controllers/ContentClasses'); var contentClasses = _interopRequireWildcard(_ContentClasses);
var _ContentResume = require('./controllers/ContentResume'); var contentResume = _interopRequireWildcard(_ContentResume);

const routes = _express.Router.call(void 0, );

routes.post('/user/create', user.create);
routes.put('/user/update', _loginRequired2.default, user.update);
routes.post('/user/token', TokenController.create);
routes.post('/user/photo', _loginRequired2.default, FotoController.index);

routes.get('/user/select', _loginRequired2.default, user.getUser);

routes.post('/quizcontent/create', QuizContentController.create);
routes.get('/quizcontent/index', QuizContentController.index);

routes.post('/quizquestion/create', QuizQuestionController.create);
routes.get('/quizquestion/quiz/', _loginRequired2.default, QuizQuestionController.startQuiz);

routes.get('/contentClasses/index/:id', _loginRequired2.default, contentClasses.index);
routes.post('/contentClasses/create', contentClasses.create);
routes.get('/contentClasses/search/:id', contentClasses.search);

routes.get('/resume/view/:id', _loginRequired2.default, contentResume.index);
routes.get('/resume/search/:id', contentResume.search);
routes.post('/resume/create', contentResume.create);


exports. default = routes;
