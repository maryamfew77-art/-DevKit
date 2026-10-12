
const languageSelect = document.getElementById("language");
const codeInput = document.getElementById("code-input");
const codeOutput = document.getElementById("code-output");
const message = document.getElementById("message");

function formatHTML(source) {
  const tokens = source.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/g);

  if (!tokens) {
    return source.trim();
  }

  const voidTags = [
    "area", "base", "br", "col", "embed", "hr", "img",
    "input", "link", "meta", "param", "source", "track", "wbr"
  ];

  let indent = 0;
  const result = [];

  for (const token of tokens) {
    const part = token.trim();

    if (!part) continue;

    if (part.startsWith("</")) {
      indent = Math.max(0, indent - 1);
    }

    result.push("  ".repeat(indent) + part);

    if (
      part.startsWith("<") &&
      !part.startsWith("</") &&
      !part.startsWith("<!") &&
      !part.startsWith("<?") &&
      !part.endsWith("/>")
    ) {
      const tagMatch = part.match(/^<\s*([a-zA-Z][\w:-]*)/);
      const tagName = tagMatch ? tagMatch[1].toLowerCase() : "";

      if (tagName && !voidTags.includes(tagName)) {
        indent++;
      }
    }
  }

  return result.join("\n");
}

function formatCSS(source) {
  let output = "";
  let indent = 0;
  let inString = "";
  let inComment = false;

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    const next = source[i + 1];

    if (inComment) {
      output += char;

      if (char === "*" && next === "/") {
        output += "/";
        i++;
        inComment = false;
      }

      continue;
    }

    if (inString) {
      output += char;

      if (char === "\\" && i + 1 < source.length) {
        output += source[++i];
      } else if (char === inString) {
        inString = "";
      }

      continue;
    }

    if (char === "/" && next === "*") {
      output += "/*";
      i++;
      inComment = true;
      continue;
    }

    if (char === '"' || char === "'") {
      inString = char;
      output += char;
      continue;
    }

    if (char === "{") {
      output = output.trimEnd() + " {\n";
      indent++;
      output += "  ".repeat(indent);
    } else if (char === ";") {
      output = output.trimEnd() + ";\n" + "  ".repeat(indent);
    } else if (char === "}") {
      output = output.trimEnd();

      if (output.endsWith(";")) {
        output += "\n";
      }

      indent = Math.max(0, indent - 1);
      output += "  ".repeat(indent) + "}\n\n";
    } else if (char === "\n" || char === "\r" || char === "\t" || char === " ") {
      if (output && !output.endsWith(" ") && !output.endsWith("\n")) {
        output += " ";
      }
    } else {
      output += char;
    }
  }

  return output.trim();
}

document.getElementById("format-btn").addEventListener("click", () => {
  const source = codeInput.value.trim();

  if (!source) {
    message.textContent = "Please enter some code first.";
    return;
  }

  try {
    codeOutput.value = languageSelect.value === "html"
      ? formatHTML(source)
      : formatCSS(source);

    message.textContent = "Code formatted successfully.";
  } catch {
    message.textContent = "Unable to format this code.";
  }
});

document.getElementById("copy-btn").addEventListener("click", async () => {
  if (!codeOutput.value) {
    message.textContent = "Format your code first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(codeOutput.value);
    message.textContent = "Formatted code copied!";
  } catch {
    codeOutput.select();
    const copied = document.execCommand("copy");
    message.textContent = copied
      ? "Formatted code copied!"
      : "Copy failed. Please copy the selected text manually.";
  }
});

document.getElementById("clear-btn").addEventListener("click", () => {
  codeInput.value = "";
  codeOutput.value = "";
  message.textContent = "Fields cleared.";
});
