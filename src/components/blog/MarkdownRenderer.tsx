import { useMemo } from "react";

interface Props {
  content: string;
}

export function MarkdownRenderer({ content }: Props) {
  const blocks = useMemo(() => parseBlocks(content), [content]);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h1":
            return (
              <h1 key={i} className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {block.text}
              </h1>
            );
          case "h2":
            return (
              <h2 key={i} className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-10">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="font-heading text-xl md:text-2xl font-semibold text-foreground mt-8">
                {block.text}
              </h3>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-primary pl-5 py-2 my-2 text-foreground/90 italic bg-primary/[0.04] rounded-r-md">
                {renderInline(block.text)}
              </blockquote>
            );
          case "code":
            return <CodeBlock key={i} lang={block.lang} code={block.text} />;
          case "ul":
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 text-foreground/85 marker:text-primary">
                {block.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "p":
          default:
            return (
              <p key={i} className="text-foreground/85 leading-relaxed text-[1.0625rem]">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <figure className="my-2 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0b0e14] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          {lang || "shell"}
        </span>
      </div>
      <pre className="px-5 py-4 overflow-x-auto text-[0.875rem] leading-relaxed font-mono text-foreground/90">
        <code>{highlight(code, lang)}</code>
      </pre>
    </figure>
  );
}

type Block =
  | { type: "h1" | "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "code"; lang: string; text: string }
  | { type: "ul"; items: string[] };

function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]); i++;
      }
      i++;
      blocks.push({ type: "code", lang, text: buf.join("\n") });
      continue;
    }
    if (/^###\s+/.test(line)) { blocks.push({ type: "h3", text: line.replace(/^###\s+/, "") }); i++; continue; }
    if (/^##\s+/.test(line)) { blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") }); i++; continue; }
    if (/^#\s+/.test(line)) { blocks.push({ type: "h1", text: line.replace(/^#\s+/, "") }); i++; continue; }
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; }
      blocks.push({ type: "quote", text: buf.join(" ") });
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^[-*]\s+/, "")); i++; }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    const buf: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !/^(#|>|```|[-*]\s+)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    blocks.push({ type: "p", text: buf.join(" ") });
  }
  return blocks;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++} className="text-foreground font-semibold">{token.slice(2, -2)}</strong>);
    } else {
      parts.push(<code key={key++} className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-primary font-mono text-[0.85em]">{token.slice(1, -1)}</code>);
    }
    lastIndex = m.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function highlight(code: string, lang: string): React.ReactNode {
  if (!lang || lang === "text" || lang === "shell") return code;
  const keywords: Record<string, string[]> = {
    python: ["def","return","import","from","as","if","else","elif","for","while","in","not","and","or","class","with","try","except","finally","lambda","True","False","None","pass","break","continue","yield","async","await"],
    javascript: ["const","let","var","function","return","if","else","for","while","import","from","export","default","class","new","this","async","await","true","false","null","undefined"],
    typescript: ["const","let","var","function","return","if","else","for","while","import","from","export","default","class","new","this","async","await","interface","type","enum","true","false","null","undefined","as"],
  };
  const kws = keywords[lang] || [];
  const lines = code.split("\n");
  return lines.map((line, idx) => (
    <span key={idx}>{tokenizeLine(line, kws)}{idx < lines.length - 1 ? "\n" : ""}</span>
  ));
}

function tokenizeLine(line: string, kws: string[]): React.ReactNode {
  const commentMatch = line.match(/(#.*$|\/\/.*$)/);
  let codePart = line;
  let commentPart = "";
  if (commentMatch && commentMatch.index !== undefined) {
    codePart = line.slice(0, commentMatch.index);
    commentPart = line.slice(commentMatch.index);
  }
  const regex = /("[^"]*"|'[^']*'|\b[A-Za-z_][A-Za-z0-9_]*\b|\d+(?:\.\d+)?|\s+|[^\sA-Za-z0-9_'"]+)/g;
  const tokens = codePart.match(regex) || [];
  const nodes = tokens.map((t, i) => {
    if (/^["']/.test(t)) return <span key={i} className="text-[#a5d6a7]">{t}</span>;
    if (kws.includes(t)) return <span key={i} className="text-primary font-medium">{t}</span>;
    if (/^\d/.test(t)) return <span key={i} className="text-[#ffb86c]">{t}</span>;
    return <span key={i}>{t}</span>;
  });
  return (<>{nodes}{commentPart && <span className="text-muted-foreground italic">{commentPart}</span>}</>);
}
