/*

This program is property of StyleMatch Inc.
This is the main component that displays an input label and brings back a response from an LLM
*/

import React, { useState, useEffect } from 'react';
import './Chat.scss'; // Assuming you have Pico CSS imported in this file.

import ShowMessages from './ShowMessages';
import Dropdown from './Dropdown';

// ver0.1 of API 
//const URL = 'https://swjy55qrh5.execute-api.us-west-2.amazonaws.com/dev/llm_invoke';

// ver0.2 of API - include image 
const URL = 'https://nq6kwer0pc.execute-api.us-west-2.amazonaws.com/dev/invokellm';


const HelpComponent = () => {
  return (
    <details>
      <summary><h6>Help</h6></summary>
      <ul><li><small>Example 1: Recommend a saree for haldi ceremony. I prefer intricate patterns</small></li>
        <li><small>Example 2: Suggest a chudidhar for an elegant wedding. I like colors of red and pink</small></li>
      </ul>
    </details>
  );
};

const InputComponent = ({ value, onChange, onClick }) => {
  return (
    <div class="grid">
      <form>
        <input type="search" placeholder='I can help recommend Indian dresses for women. Please tell me about your preferences and occasion so I can customize' value={value} onChange={onChange} />

        <div>
          <button type="button" data-tooltip="ask the AI" onClick={onClick}>Ask</button>
        </div>
        <div><HelpComponent /></div>
      </form></div>

  );
};

const StringifyParam = function (data) {
  return Object.entries(data)
    .map((e) => e.join('='))
    .join('&');
};

// function that review user input and deletes unnecessary words
const handleEliminate = function (data) {
  const wordsToRemove = ['fuck', 'boobs', 'stop', 'stupid', 'weather', 'cunt', 'sex'];
  let resultSentence = data;
  wordsToRemove.forEach(word => {
    resultSentence = resultSentence.replace(new RegExp(word, 'gi'), '');
  });
  return resultSentence;
};


const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [usrMessage, setUsrMessage] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [imgURL, setimgURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOption1, setSelectedOption1] = useState(null);

  const options1 = [
    { id: 1, label: 'Example 1: Recommend a saree for haldi ceremony. I prefer intricate patterns' },
    { id: 2, label: 'Example 2: Suggest a dress for haldi ceremony. Im tall with long dark hair' },
    { id: 3, label: 'Example 3: Describe hair styles for haldi' },
  ];

  const handleSelectOption1 = (option) => {
    setSelectedOption1(option);
  };

  useEffect(() => {
    const fetchData = async () => {
      let body = StringifyParam({ 'inputprompt': encodeURIComponent(usrMessage) });
      const url_with_parameters = `${URL}?${body}`;

      try {
        setLoading(true);
        const response = await fetch(url_with_parameters, {
          method: 'GET',
          headers: {
            'Accept': '*',
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network Response Not Ok');
        }

        const responseData = await response.json();
        const responseBody = JSON.parse(responseData.body);
        setAIResponse(responseBody.response);
        setimgURL(responseBody.image_url);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data', error);
        setAIResponse('Error fetching data', error);
        setimgURL('');
        setLoading(false);
      }
    };

    if (usrMessage !== '') {
      fetchData();
    }
  }, [usrMessage]);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleClick = () => {
    // convert the user input to lower case and delete any stray words
    setUsrMessage(handleEliminate(inputText.toLowerCase()));
    setAIResponse("working ..");
    setInputText('');
  };

  return (
    <div className="container">

      <InputComponent value={inputText} onChange={handleChange} onClick={handleClick} />

      <div><Dropdown
        title="Help"
        options={options1}
        onSelect={handleSelectOption1}
        selectedValue={selectedOption1}
        placeholder=""
      /></div>
      <div>
        {loading ? (
          <ShowMessages label1={usrMessage} label2='' />
        ) : (
          <ShowMessages label1={usrMessage} label2={aiResponse} img={imgURL} />
        )}
      </div>

    </div>
  );
};

export default Chat;