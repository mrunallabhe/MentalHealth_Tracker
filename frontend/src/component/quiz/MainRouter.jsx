import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';


function MainRouter() {
  return (
    <Router>
      <Routes>
        {/* This is the base route that renders the App component */}
        <Route path="/" element={<App />}>
          {/* This route will render the QuestionGenerator component */}
          
        </Route>
      </Routes>
    </Router>
  );
}

export default MainRouter;
