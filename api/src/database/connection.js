import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import ClassResume from '../models/ClassResume';
import ContentClasses from '../models/ContentClasses';
import Foto from '../models/Foto';
import Notes from '../models/Notes';
import QuizContent from '../models/QuizContent';
import QuizQuestion from '../models/QuizQuestion';
import User from '../models/User';

const models = [User, Foto, QuizContent, QuizQuestion, Notes, ContentClasses, ClassResume];
const connection = new Sequelize(databaseConfig);
models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

