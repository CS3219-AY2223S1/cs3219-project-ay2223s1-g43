import * as Y from 'yjs'
import CodeMirror from '@uiw/react-codemirror';
import RandomColor from "randomcolor";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { WebrtcProvider } from 'y-webrtc'
import { yCollab } from "y-codemirror.next";

const Editor = (props) => {
  const { username, room, password } = props;
  const ydoc = new Y.Doc();
  //syncs the ydoc throught WebRTC connection
  const provider = new WebrtcProvider(
    room,
    ydoc,
    {
      signaling: [
        "wss://signaling.yjs.dev", //public signaling server
      ],
      password: password,  
    }
  );
  const yText = ydoc.getText("codemirror");
  //Undomanager used for stacking the undo and redo operation for yjs
  const yUndoManager = new Y.UndoManager(yText);
  const awareness = provider.awareness;
  const color = RandomColor();
  //Awareness protocol is used to propagate your information (cursor position , name , etc)
  awareness.setLocalStateField("user", {
    name: username,
    color: color,
  });

  return (
    <CodeMirror 
      value=""
      height="600px"
      width='500px'
      theme={dracula}
      extensions={[
        javascript({ jsx: true }),
        yCollab(yText, provider.awareness, { yUndoManager })
      ]}
    />
  );
};

export default Editor;
