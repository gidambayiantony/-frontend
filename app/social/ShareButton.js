import React from 'react';

function ShareButton(props) {
  // Logic to share news articles to social media
  return (
    <button onClick={props.shareToSocialMedia}>Share</button>
  );
}

export default ShareButton;

