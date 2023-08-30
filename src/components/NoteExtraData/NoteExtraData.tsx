import { CustomLink } from "data/types";
import React from "react";

interface NoteExtraDataProps {
  excerpt?: string;
  featured_text?: string;
  suggest_content?: string;
}

const Excerpt: React.FC<NoteExtraDataProps> = ({
  excerpt,
  featured_text,
  suggest_content,
}) => {
  return (
    <>
      {excerpt && (
        <div className="excerpt-container">
          <div className="excerpt-divider" />
          <div className="font-lora">{excerpt}</div>
        </div>
      )}
      {featured_text && (
        <div className="featured-text-container">
          <img src="/images/vectors/megaphone.png" alt="featured-text" />
          <div dangerouslySetInnerHTML={{ __html: featured_text }} />
        </div>
      )}
      {suggest_content && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: suggest_content }} />
        </div>
      )}
    </>
  );
};

export default Excerpt;
