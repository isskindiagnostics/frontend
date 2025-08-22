import { JSX } from "react";

import {
  contentBlock,
  contentHeading,
  contentList,
  contentListItem,
} from "../index.css";

import type {
  TermsSection as TermsSectionType,
  ContentElement,
} from "../content";

interface TermsSectionProps {
  section: TermsSectionType;
}

function renderContentElement(
  element: ContentElement,
  index: number,
  section: TermsSectionType
) {
  switch (element.type) {
    case "paragraph":
      return <p key={index}>{element.content}</p>;

    case "paragraph-multiline":
      return (
        <p key={index}>
          {element.lines.map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < element.lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );

    case "paragraph-italic":
      return (
        <p key={index}>
          {element.content}
          <i>{element.italicText}</i>
        </p>
      );

    case "paragraph-bold":
      return (
        <p key={index}>
          {element.boldParts.map((part, partIndex) =>
            part.isBold ? <b key={partIndex}>{part.text}</b> : part.text
          )}
        </p>
      );

    case "definition":
      return (
        <p key={index}>
          <b>{element.term}</b> {element.definition}
        </p>
      );

    case "list":
      return (
        <ul key={index} className={contentList}>
          {element.items.map((item, itemIndex) => (
            <li key={itemIndex} className={contentListItem}>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      );

    case "heading":
      const HeadingTag = `h${element.level}` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag key={index} id={section.id}>
          {element.content}
        </HeadingTag>
      );

    default:
      return null;
  }
}

export default function TermsSection({ section }: TermsSectionProps) {
  return (
    <div className={contentBlock} id={section.id}>
      <h2 className={contentHeading}>{section.title}</h2>
      {section.elements.map((element, index) =>
        renderContentElement(element, index, section)
      )}
    </div>
  );
}
