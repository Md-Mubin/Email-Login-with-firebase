import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LayoutOne from './Layouts/LayoutOne';
import app from './firebase.config';
import Home from './Pages/Home/Home';
import Authentication from './Components/Authentication/Authentication';
import AnimatedCursor from 'react-animated-cursor';


function App() {

  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<LayoutOne />}>
          <Route index element={<Authentication />} />
          <Route path='/Home' element={<Home />} />
        </Route>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={myRouter} />

      <AnimatedCursor
        color="255,255,255"
        innerSize={15}
        outerSize={30}
        outerScale={1.4}
        innerScale={1}
        outerAlpha={1}
        innerStyle={{
          mixBlendMode: 'difference',
        }}
        outerStyle={{
          mixBlendMode: 'difference',
        }}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="password"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
        ]}
      />
    </>
  );
}

export default App
