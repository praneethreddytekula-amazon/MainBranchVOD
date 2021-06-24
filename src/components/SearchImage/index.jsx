import React, { useState, useReducer } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { searchVodAssets } from '../../graphql/queries';
import { thisStringValue } from 'es-abstract/es2019';
//import { data } from 'browserslist';
//import { string } from 'joi';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.posts;
    case ADDITIONAL_QUERY:
      return [...state, ...action.posts]
    case SUBSCRIPTION:
      return [action.post, ...state]
    default:
      return state;
  }
};

export default function Search() {
  const [posts, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const searchAssets = async (type, nextToken = null) => {
    console.log('searchAssets called: ' + query)
    if (query === '') return;
    const res = await API.graphql(graphqlOperation(searchVodAssets, {
      filter: { title: { matchPhrase: query } },
      limit: 20,
      nextToken: nextToken,
    }));

    var output = document.getElementById('output');
    var totalLength = document.getElementById('totalLength');
 
    var res1 = "";
    for(var i = 0; i< res.data.searchVodAssets.items.length; i++){

      res1 = res1 + res.data.searchVodAssets.items[i].title + "<br></br> ";
    }
    output.innerHTML = res1; 
    totalLength.innerHTML = res.data.searchVodAssets.items.length;


  // fetch(res)
  //   .then(results => results.json())
  //   .then(data => {

  //   })

    console.log(res.data.searchVodAssets.items);
    //dispatch({ type: type, posts: res.data.searchAssets.items })
    //setNextToken(res.data.searchAssets.nextToken);
    //setIsLoading(false);
  }

  const getAdditionalPosts = () => {
    if (nextToken === null) return; //Reached the last page
    searchAssets(ADDITIONAL_QUERY, nextToken);
  }

  const handleChange = event => {
    setQuery(event.target.value);
  };



return (
      <div className="container">
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search for videos"
            aria-label="Label"
            aria-describedby="basic-addon2"
            value={query}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button
              onClick={()=> {searchAssets(INITIAL_QUERY)}}
              className="btn btn-primary"
              type="submit"
            >
              Search
            </button>
          </div>
       </div>
         <p>Search results found: <a id = "totalLength"> </a> </p> <br></br>
         <p id = "output"></p> 
      </div>
);
  }


