import { useEffect, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Editor } from "@tinymce/tinymce-react";
import marked from "marked";
import showdown from "showdown";
import DOMPurify from "dompurify";
import { Message } from "ai";
import { useUserData } from "@/store/useUserData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate } from "@/utils/formatDate";
type ChatProps = {
  messages: Message[];
};

const Chat = ({ messages }: ChatProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const converter = new showdown.Converter();
  console.log(messages)

  const convertMarkdownToHtml = (markdown: string) => {
    const html = converter.makeHtml(markdown);
    return DOMPurify.sanitize(html);
  };

  const { name, initials } = useUserData();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 w-full">
      {messages.map((m) => (
        <div key={m.id} className="mt-2">
          <div className="flex gap-4">
            <div className="p-5">
              <Avatar>
                {m.role !== "user" && (
                  <AvatarImage
                    src="/assets/img/wheretogo.png"
                    className="object-cover"
                  />
                )}
                {m.role === "user" && (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className={`${m.role !== 'user' && 'bg-green-100'} p-5 rounded-xl`}>
              <div>
                <span>{m.role === "user" ? "You: " : "Where To Go AI: "}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  • {formatDate(m.createdAt as Date)}
                </span>
              </div>
              <div className="prose lg:prose-lg">
                {m.role === "user" && <p className="py-2 pb-5">{m.content}</p>}
                {m.role !== "user" && (
                  <Editor
                    tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
                    licenseKey="gpl"
                    id={`editor-${m.id}`}
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    initialValue={
                      convertMarkdownToHtml(m.content) !== null
                        ? convertMarkdownToHtml(m.content)
                        : ""
                    }
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
                      content_css: "./content.css",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
