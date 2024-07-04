import React from 'react';

const Base64ImageDisplay = ({ base64String }) => {
  // Decode the base64 string into binary data
  const binaryString = atob(base64String);
  // Convert the binary string into a Uint8Array
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  // Create a Blob from the Uint8Array
  const blob = new Blob([byteArray], { type: 'image/jpeg' });
  // Create a URL from the Blob
  const imageUrl = URL.createObjectURL(blob);

  return (
    <div>
      <img src={imageUrl} alt="" />
    </div>
  );
};

export default Base64ImageDisplay;
