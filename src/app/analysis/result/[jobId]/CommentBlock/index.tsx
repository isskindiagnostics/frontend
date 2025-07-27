"use client";

import { InputField } from "isskinui";

import ContentBlock from "@/components/ContentBlock";
import { useCommentStore } from "@/stores/useCommentStore";

const CommentBlock = () => {
  const { comment, setComment } = useCommentStore();

  return (
    <ContentBlock>
      <InputField
        label="Comentários"
        type="text"
        width="100%"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </ContentBlock>
  );
};
export default CommentBlock;
