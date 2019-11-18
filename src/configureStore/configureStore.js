import { createStore, applyMiddleware} from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from '../reducers/reducer';
 

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
 
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducers, initialState);
}