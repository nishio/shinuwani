import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
export const Share = (props: {
  result: string;
}) => {
  const articleUrl = "https://shinuwani.netlify.com/";
  const articleTitle = "○年後に死ぬあなた";
  return <>
    <FacebookShareButton url={articleUrl}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>

    <TwitterShareButton title={`${props.result}: ${articleTitle}`} via="nishio" url={articleUrl}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  </>;
};
