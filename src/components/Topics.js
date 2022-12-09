import React, { useEffect, useState } from "react";
import { getTopics } from "../utills/api";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTopics().then((result) => {
      setTopics(result);
      setLoading(false);
    });
  });
  return loading ? (
    <p>loading....</p>
  ) : (
    <div>
      <ul className="topic-nav">
        {topics.map((topic, i) => {
          return (
            <li className="topic" key={i}>
              {topic.slug}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Topics;
