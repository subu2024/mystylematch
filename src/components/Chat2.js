import React, { useState, useEffect } from 'react';

import ShowMessages from './ShowMessages';

// ver0.2 of API - include image 
const URL = 'https://nq6kwer0pc.execute-api.us-west-2.amazonaws.com/dev/invokellm';

const StringifyParam = function (data) {
    return Object.entries(data)
        .map((e) => e.join('='))
        .join('&');
};

const getFirstWord = (text) => {
    if (!text) return ""; // Return an empty string if text is falsy
    const words = text.trim().split(/\s+/); // Split text by whitespace
    return words[0]; // Return the first word
};

const Chat2 = ({ isRecommend }) => {
    //const [requestType, setRequestType] = useState('');
    //const [dressType, setDressType] = useState('');
    //const [occasion, setOccasion] = useState('');
    //const [primaryColor, setPrimaryColor] = useState('');
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
        //if (requestType) parts.push(requestType);

        //if (requestType && requestType.toLowerCase() !== 'describe') {
        //    // Check dressType for "any"
        //    if (dressType && dressType.toLowerCase() !== 'any') {
        //        parts.push(dressType);
        //    } else {
        //        parts.push(' any dress'); // If dressType is "any", add "any dress"
        //    }

        //    if (occasion) parts.push(`for ${occasion}`);

        //    if (primaryColor && primaryColor !== '') {
        //        parts.push(`in ${primaryColor}`);
        //    }

        //    if (freeText) {
        //        parts.push(freeText);
        //    }
        //} else {


        // previous version used drop down boxes for choices ..
        // changed all to just provide a text box .. 
        // ideally interested in checking the first word to be "recommend, suggest" for recommendation
        // and "describe, teach" for other descriptions ..
        // no checks done at this point .. assuming user knows to enter the correct key word
        if (freeText) {
            parts.push(freeText);
        }
        else {
            parts.push(' describe hair styles for haldi');
        }

        // }



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
        <div className="container-fluid">


            <div class="grid">
                <div>
                    {isRecommend ? (
                        <input type="text" placeholder="recommend a dress type of color for occassion" value={freeText} onChange={(e) => setFreeText(e.target.value)} />
                    ) : (
                        <input type="text" placeholder="describe hair styles/ bag types for haldi" value={freeText} onChange={(e) => setFreeText(e.target.value)} />
                    )}

                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>

            <article>
                {isRecommend ? (
                    <header>Designer Response:</header>
                ) : (
                    <header>Ideas Response:</header>
                )}

                {loading ? (
                    <ShowMessages label1={combinedSentence} label2='' />
                ) : (
                    <ShowMessages label1={combinedSentence} label2={aiResponse} img={imgURL} />
                )}
                <footer></footer>
            </article>


        </div>
    );
};

export default Chat2;