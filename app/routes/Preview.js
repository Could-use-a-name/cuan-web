import { useEffect, useState } from 'react';
import { parse } from 'marked';

export default function Preview() {
  const [markdown, setMarkdown] = useState('');

  function loadMarkdown() {
    return localStorage.getItem('MARKDOWN');
  }

  useEffect(() => {
    setMarkdown(loadMarkdown());
  }, []);

  if (!markdown) {
    return (
      <main>
        <h1>Preview</h1>
        <p>You havn't written any markdown. Go to the <a href="/editor">editor</a></p>
      </main>
    )
  }

  return (
    <main>
      <h1>Preview</h1>
      <p>Here you can see your markdown that wrote in the <a href="/editor">editor</a></p>

      <div style={{
        border: '1px solid red'
      }} dangerouslySetInnerHTML={{__html: parse(markdown)}}></div>
    </main>
  )
}