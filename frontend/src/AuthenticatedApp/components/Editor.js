import * as Y from 'yjs'
import CodeMirror from '@uiw/react-codemirror';
import RandomColor from "randomcolor";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { WebsocketProvider } from 'y-websocket'
import { yCollab } from "y-codemirror.next";
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import "../../styles/editor.css"

const Editor = (props) => {
  const { room, height, ydoc, yText } = props;
  const { userDetails } = useAuthContext();

  const provider = new WebsocketProvider(
    'wss://demos.yjs.dev',
    room,
    ydoc,
  );

  // Undo manager used for stacking the undo and redo operation for yjs
  const yUndoManager = new Y.UndoManager(yText);
  const awareness = provider.awareness;
  const color = RandomColor();
  // Awareness protocol is used to propagate your information (cursor position , name , etc)
  awareness.setLocalStateField("user", {
    name: userDetails.username,
    color: color,
  });

  return (
    <CodeMirror
      value=""
      height={height}
      width='100%'
      theme={dracula}
      extensions={[
        javascript({ jsx: true }),
        yCollab(yText, provider.awareness, { yUndoManager })
      ]}
    />
  );
};

export default Editor;
