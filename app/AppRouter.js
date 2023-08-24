import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RootLayout from './layouts';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import QuizDetailsScreen from './screens/quizDetails';
import QuizOnGoingScreen from './screens/quizOnGoing';
import QuizResultScreen from './screens/quizResult';
import QuizNewScreen from './screens/quizNew';

const AppRouter = () => {
  return (
    <Router>
      <RootLayout>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route path="/home" component={HomeScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/quizDetails" component={QuizDetailsScreen} />
          <Route path="/quizOnGoing" component={QuizOnGoingScreen} />
          <Route path="/quizResult" component={QuizResultScreen} />
          <Route path="/quizNew" component={QuizNewScreen} />
        </Switch>
      </RootLayout>
    </Router>
  );
};

export default AppRouter;
