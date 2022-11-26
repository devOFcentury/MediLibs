import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from './components/Menu';
import Acceuil from './pages/Acceuil/Acceuil';
import Movies from './pages/Movies/Movies';
import TV from './pages/TV/TV';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId='main'>
        <Menu/>
        <IonRouterOutlet id='main'>
          <Route exact path='/acceuil' component={Acceuil} />
          <Route exact path='/tv' component={TV} />
          <Route exact path='/tv/:genre/:id' component={TV} />
          <Route exact path='/movies' component={Movies} />
          <Route exact path='/movies/:genre/:id' component={Movies} />

          <Route exact path="/">
            <Redirect to="/acceuil" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
