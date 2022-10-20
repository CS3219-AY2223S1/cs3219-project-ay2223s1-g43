import * as Y from 'yjs'
import CodeMirror from '@uiw/react-codemirror';
import RandomColor from "randomcolor";
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { useEffect, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc'
import { yCollab } from "y-codemirror.next";
import { useAuthContext } from '../hooks/auth/useAuthContext';
import "../styles/editor.css"

const Editor = (props) => {
  const { room, password, height, ydoc, yText } = props;
  const [collab, setCollab] = useState(null);
  const { userDetails } = useAuthContext();

  useEffect(() => {
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

    // Undo manager used for stacking the undo and redo operation for yjs
    const yUndoManager = new Y.UndoManager(yText);
    const awareness = provider.awareness;
    const color = RandomColor();
    // Awareness protocol is used to propagate your information (cursor position , name , etc)
    awareness.setLocalStateField("user", {
      name: userDetails.username,
      color: color,
    });
    setCollab(yCollab(yText, provider.awareness, { yUndoManager }));
    return () => {
      if (provider) {
        provider.disconnect();
        provider.destroy();
      }
    };
  }, [ydoc, yText, room, password]);

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
