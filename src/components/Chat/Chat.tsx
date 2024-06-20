import { useEffect, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Editor } from "@tinymce/tinymce-react";
import marked from "marked";
import showdown from "showdown";
import DOMPurify from "dompurify";
import { Message } from "ai";
type ChatProps = {
  messages: Message[];
};

const Chat = ({ messages }: ChatProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const converter = new showdown.Converter();

  const convertMarkdownToHtml = (markdown: string) => {
    const html = converter.makeHtml(markdown);
    return DOMPurify.sanitize(html);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
      {messages.map((m) => (
        <div
          key={m.id}
          className="text-gray-500 dark:text-gray-400 mt-2 whitespace-pre-wrap prose lg:prose-lg"
        >
          {m.role === "user" ? "User: " : "AI: "}
          {/* <Markdown remarkPlugins={[remarkGfm]}>{m.content}</Markdown> */}
          <Editor
            tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
            licenseKey="gpl"
            id="editor"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue={convertMarkdownToHtml(m.content) !== null ? convertMarkdownToHtml(m.content) : ''}
            
            inline={true}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_css: './content.css'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Chat;
