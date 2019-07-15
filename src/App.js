import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { UploadFile, Dashboard } from './pages';
import { rootReducer } from './reducers';
import { createStore  } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <div style={{width:"100vw", height:"100vh"}}>
        <BrowserRouter>
          <Switch>
              <Route exact path="/" component={()=>{
                return <Redirect to="/upload-file" />
              }} />
              <Route exact path="/upload-file" component={UploadFile} />
              <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
