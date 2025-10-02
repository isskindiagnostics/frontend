import Link from "next/link";

import { TermsSection } from "../content";
import { topicList, listItem, topicItem } from "../index.css";

interface TopicNavigationProps {
  sections: TermsSection[];
}

export default function TopicNavigation({ sections }: TopicNavigationProps) {
  return (
    <ul className={topicList}>
      {sections.map((section, idx) => (
        <li className={listItem} key={idx}>
          <Link className={topicItem} href={`#${section.id}`}>
            {section.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
