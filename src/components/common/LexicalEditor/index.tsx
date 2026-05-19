// 'use client';
//
// import { useEffect } from 'react';
// import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import { ContentEditable } from '@lexical/react/LexicalContentEditable';
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
// import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
// import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
// import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
// import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
// import {
//   $getRoot,
//   $createParagraphNode,
//   LexicalEditor as TLexicalEditor,
//   ElementNode,
// } from 'lexical';
//
// interface Props {
//   value: string; // HTML
//   onChange: (html: string) => void;
//   minHeight?: number;
// }
//
// function HTMLExportPlugin({ onChange }: { onChange: (html: string) => void }) {
//   const [editor] = useLexicalComposerContext();
//
//   useEffect(() => {
//     return editor.registerUpdateListener(({ editorState }) => {
//       editorState.read(() => {
//         const htmlString = $generateHtmlFromNodes(editor);
//         onChange(htmlString);
//       });
//     });
//   }, [editor, onChange]);
//
//   return null;
// }
//
// export default function LexicalEditor({ value, onChange, minHeight = 150 }: Props) {
//   const initialConfig = {
//     namespace: 'LexicalEditor',
//     theme: { paragraph: 'mb-3' },
//     onError: (error: Error) => console.error('Lexical Error:', error),
//     editable: true,
//     editorState: (editor: TLexicalEditor) => {
//       editor.update(() => {
//         try {
//           const root = $getRoot();
//           root.clear();
//           if (value) {
//             const parser = new DOMParser();
//             const dom = parser.parseFromString(value, 'text/html');
//             const nodes = $generateNodesFromDOM(editor, dom);
//             if (nodes.length > 0) {
//               nodes.forEach((node) => {
//                 if (node instanceof ElementNode) {
//                   root.append(node);
//                 } else {
//                   const paragraph = $createParagraphNode();
//                   paragraph.append(node);
//                   root.append(paragraph);
//                 }
//               });
//             } else {
//               root.append($createParagraphNode());
//             }
//           } else {
//             root.append($createParagraphNode());
//           }
//         } catch (err) {
//           console.error('Failed to parse initial HTML:', err);
//         }
//       });
//     },
//   };
//
//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       <div className="rounded-lg border bg-background p-4 text-sm " style={{ minHeight }}>
//         <RichTextPlugin
//           contentEditable={<ContentEditable className="min-h-[inherit] outline-none" />}
//           placeholder={<div className="opacity-60">Write something...</div>}
//           ErrorBoundary={LexicalErrorBoundary}
//         />
//         <HistoryPlugin />
//         <AutoFocusPlugin />
//         <HTMLExportPlugin onChange={onChange} />
//         <EditorRefPlugin editorRef={() => {}} />
//       </div>
//     </LexicalComposer>
//   );
// }
