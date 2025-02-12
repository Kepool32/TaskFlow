import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import TasksPage from './pages/TasksPage/TasksPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/tasks/:projectId" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
