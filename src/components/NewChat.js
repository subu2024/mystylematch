import React, { useState, useEffect } from 'react';
import './NewChat.scss'; 
import ShowMessages from './ShowMessages';

// ver0.2 of API - include image 
const URL = 'https://nq6kwer0pc.execute-api.us-west-2.amazonaws.com/dev/invokellm';

const StringifyParam = function (data) {
  return Object.entries(data)
    .map((e) => e.join('='))
    .join('&');
};

const NewChat = () => {
  const [requestType, setRequestType] = useState('');
  const [dressType, setDressType] = useState('');
  const [occasion, setOccasion] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [freeText, setFreeText] = useState('');
  const [combinedSentence, setCombinedSentence] = useState('');
  const [usrMessage, setUsrMessage] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [imgURL, setimgURL] = useState('');
  const [loading, setLoading] = useState(true);
  

  const handleSubmit = () => {
    //const sentence = `${requestType} ${dressType} for ${occasion} in ${primaryColor}. ${freeText}`;
    //setCombinedSentence(sentence);
    //setUsrMessage(sentence);

    // very rudimentary way of checking if all values are ok
    // additionally when asking for describe, all values are ignored and only free text is used
    // if free text is blank, then a default text is used..
    const parts = [];

    // Check each variable before adding to parts array
    if (requestType) parts.push(requestType);
  
    if (requestType && requestType.toLowerCase() !== 'describe') {
    // Check dressType for "any"
      if (dressType && dressType.toLowerCase() !== 'any') {
        parts.push(dressType);
      } else {
        parts.push(' any dress'); // If dressType is "any", add "any dress"
      }

      if (occasion) parts.push(`for ${occasion}`);

      if (primaryColor  && primaryColor !== '') {
        parts.push(`in ${primaryColor}`);
      }

      if (freeText) {
        parts.push(freeText);
      }
    } else {


      if (freeText) {
        parts.push(freeText);
      }
      else {
        parts.push(' hair styles for haldi');
      }

    }

    

    // Combine the parts into a sentence
    const sentence = parts.join(' ') + '.';
   
    setCombinedSentence(sentence);
    setUsrMessage(sentence);


    // Here you would make your API call with 'sentence' data
    // For demonstration, just log the sentence to console
    //console.log(sentence);
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

  return (
    <div className="two-column-container">
      
      <div className="column">
        <h2>Your Choices</h2>
        <div>
          <label>Request Type:</label>
          <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
            <option value="">Select...</option>
            <option value="Recommend">Recommend</option>
            <option value="Describe">Describe</option>
          </select>
        </div>
        <div>
          <label>Dress Type:</label>
          <select value={dressType} onChange={(e) => setDressType(e.target.value)}>
            <option value="">Select...</option>
            <option value="Lehenga">Lehenga</option>
            <option value="Indo Western">Indo Western</option>
            <option value="Saree">Saree</option>
            <option value="Any">Any</option>
          </select>
        </div>
        <div>
          <label>Occasion:</label>
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            <option value="">Select...</option>
            <option value="Haldi">Haldi Ceremony</option>
            <option value="Wedding">Wedding</option>
          </select>
        </div>
        <div>
          <label>Primary Color:</label>
          <select value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)}>
            <option value="">Select...</option>
            <option value="Red">Red</option>
            <option value="Pink">Pink</option>
            <option value="Blue">Blue</option>
            <option value="Yellow">Yellow</option>
            <option value="Orange">Orange</option>
          </select>
        </div>
        <div>
          <label>Other Information:</label>
          <input type="text" placeholder="enter any other necessary information" value={freeText} onChange={(e) => setFreeText(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="column">
        <h2>Designer Response</h2>
        
        {loading ? (
          <ShowMessages label1={combinedSentence} label2='' />
        ) : (
          <ShowMessages label1={combinedSentence} label2={aiResponse} img={imgURL} />
        )}
      </div>
    </div>
  );
};

export default NewChat;
