import React, { useState, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";

const CodeEditor = () => {
  const initialCode = `const GroceryItem = ({ item }) => {
    return (
      <div>
        <h2>{item.name}</h2>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    );
  }`;

  const [code, setCode] = useState(initialCode);
  const [syntaxError, setSyntaxError] = useState(null);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    checkSyntax(newCode);
  };

  const checkSyntax = (codeToCheck) => {
    try {
      Function(codeToCheck); 
      setSyntaxError(null);
    } catch (error) {
      setSyntaxError(error.message);
    }
  };

  return (
    <div style={{ width: "600px", height: "400px", position: "relative", fontFamily: "Menlo, Monaco, Consolas, 'Courier New', monospace", fontSize: "14px" }}>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        spellCheck="false"
        style={{
          width: "100%",
          height: "100%",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          whiteSpace: "pre",
          overflowWrap: "normal",
          overflowX: "auto",
          fontFamily: "inherit",
          fontSize: "inherit",
          background: "transparent",
          color: "transparent",
          caretColor: "white",
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          resize: "none",
          lineHeight: "1.5",
          overflow: "hidden",
          boxSizing: "border-box",
          margin: 0,
        }}
      />
      {syntaxError && (
        <div style={{ position: "absolute", bottom: "10px", left: "10px", color: "red" }}>
          {syntaxError}
        </div>
      )}
      <Highlight theme={themes.shadesOfPurple} code={code} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              margin: 0,
              padding: "10px",
              boxSizing: "border-box",
              minHeight: "100%",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowX: "auto",
              fontFamily: "inherit",
              fontSize: "inherit",
              lineHeight: "1.5",
            }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} key={i}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeEditor;
