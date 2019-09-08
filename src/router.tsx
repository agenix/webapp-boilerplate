import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import Home from './routes/home';
import Direction from './routes/direction';
import Differences from './routes/differences';
import Compliance from './routes/compliance';
import Launch from './routes/launch';
import Partner from './routes/partner';
import Account from './routes/account';
import Updates from './routes/updates';
import Launches from './routes/launches';
import Technical from './routes/technical';
import Team from './routes/team';
import Foundation from './routes/foundation';
import Press from './routes/press';
import Contact from './routes/contact';
import About from './routes/about';
import Involved from './routes/involved';
import Progress from './routes/progress';
import Who from './routes/who';
import Confirm from './routes/confirm';
import NotFound from './routes/not-found';
import Context from "./components/context";
import { Layout } from "./components/layout";

const Router: React.FC = () => {
  let loggedIn = false;
  const warning = localStorage.getItem("warning") || '';
  if (localStorage.getItem("jwtToken")) loggedIn = true;

  const [global, setGlobal] = useState({
    language: 'en',
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches || false,
    apiUrl: 'http://127.0.0.1:8888',
    warning,
    loggedIn,
    fullName: localStorage.getItem("fullName") || '',
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener( "change", (e) => {
    if (e.matches !== global.darkMode) setGlobal({...global, darkMode: !global.darkMode})
  });

  return (    
    <Context.Provider value={{ global, setGlobal }}>
        <BrowserRouter>
        <Layout>
          <Route render={({location}) => (
            <TransitionGroup>
              <CSSTransition timeout={450} classNames='fade' key={location.key}>
                <Switch location={location}>
                  <Route exact path = '/' component = {Home} />
                  <Route exact path = '/direction' component = {Direction} />
                  <Route exact path = '/differences' component = {Differences} />
                  <Route exact path = '/compliance' component = {Compliance} />
                  <Route exact path = '/launch' component = {Launch} />
                  <Route exact path = '/partner' component = {Partner} />
                  <Route exact path = '/account' component = {Account} />
                  <Route exact path = '/updates' component = {Updates} />
                  <Route exact path = '/launches' component = {Launches} />
                  <Route exact path = '/technical' component = {Technical} />
                  <Route exact path = '/team' component = {Team} />
                  <Route exact path = '/foundation' component = {Foundation} />
                  <Route exact path = '/press' component = {Press} />
                  <Route exact path = '/contact' component = {Contact} />
                  <Route exact path = '/about' component = {About} />
                  <Route exact path = '/involved' component = {Involved} />
                  <Route exact path = '/progress' component = {Progress} />
                  <Route exact path = '/who' component = {Who} />
                  <Route exact path = '/confirm_email/:confirmationCode' component = {Confirm} />
                  <Route component = {NotFound}/>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )} />
          </Layout>
        </BrowserRouter>
      
    </Context.Provider>
  );
}

export default Router;
