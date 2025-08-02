import { Router } from 'express';
import * as FotoController from './controllers/Foto';
import * as TokenController from './controllers/TokenController';
import * as QuizContentController from './controllers/QuizContent';
import * as QuizQuestionController from './controllers/QuizQuestions';
import * as user from './controllers/User';
import loginRequired from './middlewares/loginRequired';
import * as notesController from './controllers/Notes';
import * as contentClasses from './controllers/ContentClasses';
import * as contentResume from './controllers/ContentResume';

const routes = Router();

routes.post('/user/create', user.create);
routes.put('/user/update', loginRequired, user.update);
routes.post('/user/token', TokenController.create);
routes.post('/user/photo', loginRequired, FotoController.index);

routes.get('/user/select', loginRequired, user.getUser);

routes.post('/quizcontent/create', QuizContentController.create);
routes.get('/quizcontent/index', QuizContentController.index);

routes.post('/quizquestion/create', QuizQuestionController.create);
routes.get('/quizquestion/quiz/', loginRequired, QuizQuestionController.startQuiz);

routes.get('/contentClasses/index/:id', loginRequired, contentClasses.index);
routes.post('/contentClasses/create', contentClasses.create);
routes.get('/contentClasses/search/:id', contentClasses.search);

routes.get('/resume/view/:id', loginRequired, contentResume.index);
routes.get('/resume/search/:id', contentResume.search);
routes.post('/resume/create', contentResume.create);


export default routes;
