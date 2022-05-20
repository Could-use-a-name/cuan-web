import { useEffect, useState } from 'react';

const LOCALSTORAGE_MARKDOWN_KEY = "MARKDOWN";

export default function Editor() {
  const [markdown, setMarkdown] = useState('# Write some markdown');

  function saveMarkdown() {
    return localStorage.setItem(LOCALSTORAGE_MARKDOWN_KEY, markdown);
  }

  function loadMarkdown() {
    return localStorage.getItem(LOCALSTORAGE_MARKDOWN_KEY);
  }

  function handleMarkdownChange(e) {
    setMarkdown(e.target.value.toString());
  }

  useEffect(() => {
    setMarkdown(loadMarkdown());
  }, [])

  return (
    <main>
      <h1>Editor</h1>
      <p>Write some markdown, click on the save button and <a href="/preview">preview</a> it</p>

      <textarea value={markdown} onChange={handleMarkdownChange}/>
      <button onClick={saveMarkdown}>Save</button>
    </main>
  );
}