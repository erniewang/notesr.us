import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './routes/root';
import { Home } from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import ChordGenerator from './pages/ChordGenerator';
import { Pitch2Notes } from './pages/Pitch2Notes';
import MusicXml from './pages/MusicXml';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/chordgen",
        element: <ChordGenerator />,
      },
      {
        path: "/pitch2notes",
        element: <Pitch2Notes />,
      },
      {
        path: "/musicxml",
        element: <MusicXml />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
