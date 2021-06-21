import reducers from './reducers';
import './App.css';
import {Provider} from 'react-redux';
import {createStore } from 'redux';

export const store = createStore(reducers);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
            <React.Fragment>
                <Header/>
                <Switch>
                  
                </Switch>
                <Footer/>
            </React.Fragment>
            </BrowserRouter>
        </Provider>
    );
  }

}

export default App;

