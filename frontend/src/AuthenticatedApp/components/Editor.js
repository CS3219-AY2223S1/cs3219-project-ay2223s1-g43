import * as Y from 'yjs'
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { WebsocketProvider } from 'y-websocket'
import { yCollab } from "y-codemirror.next";
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import "../../styles/editor.css"
import { useTheme } from '@mui/material';

const serverUrl = process.env.REACT_APP_ENV_COLLAB_SERVER_URL || 'ws://localhost:8004/api/collab'

const Editor = (props) => {
  const { room, height, ydoc, yText } = props;
  const { userDetails } = useAuthContext();
  const theme = useTheme()

  const provider = new WebsocketProvider(
    serverUrl,
    room,
    ydoc,
  );

  // Undo manager used for stacking the undo and redo operation for yjs
  const yUndoManager = new Y.UndoManager(yText);
  const awareness = provider.awareness;
  // Awareness protocol is used to propagate your information (cursor position , name , etc)
  awareness.setLocalStateField("user", {
    name: userDetails.username,
    color: theme.palette.primary.main,
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
