import React from 'react';
import ShareButton from './ShareButton';

function NewsArticle(props) {
  // Logic to display news article content
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <ShareButton shareToSocialMedia={props.shareToSocialMedia} />
    </div>
  );
}

export default NewsArticle;

