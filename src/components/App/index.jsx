import React, { useEffect, useState } from 'react';                                                                                                                                                             
import './App.css';
import GridView from '../GridView';
import SearchImage from '../SearchImage';
import Amplify, { Auth, Hub, API, graphqlOperation } from 'aws-amplify';

// Insert Location 7
import { withAuthenticator } from 'aws-amplify-react';

function App() {



return (
    <div className="App">
      <h2> Octank Video Channel </h2>
      <SearchImage />
      <header className="App-header">
        <GridView />
      </header>
    </div>
  );
}
// Insert Location 8
export default withAuthenticator(App, true);
