import * as Y from 'yjs'
import CodeMirror from '@uiw/react-codemirror';
import RandomColor from "randomcolor";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc'
import { yCollab } from "y-codemirror.next";
import "../styles/editor.css"

const Editor = (props) => {
  const { username, room, password, height } = props;
  const [collab, setCollab] = useState(null);
  useEffect(() => {
    const ydoc = new Y.Doc();
    //syncs the ydoc throught WebRTC connection
    const provider = new WebrtcProvider(
      room,
      ydoc,
      {
        signaling: [
          "wss://signaling.yjs.dev",
          'wss://y-webrtc-signaling-eu.herokuapp.com', 
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
    setCollab(yCollab(yText, provider.awareness, { yUndoManager }));
    return () => {
      if (provider) {
        provider.disconnect();
        ydoc.destroy();
      }
    };
  }, [room, password]);

  if (!collab) {
    return null;
  }
  
  return (
    <CodeMirror
      value=""
      height={height}
      width='100%'
      theme={dracula}
      extensions={[
        javascript({ jsx: true }),
        collab
      ]}
    />
  );
};

export default Editor;
