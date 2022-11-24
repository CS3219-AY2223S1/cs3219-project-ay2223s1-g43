import { atomone } from "@uiw/codemirror-theme-atomone"
import { darcula } from "@uiw/codemirror-theme-darcula"
import { dracula } from "@uiw/codemirror-theme-dracula"
import { duotoneDark } from "@uiw/codemirror-theme-duotone"
import { githubDark } from "@uiw/codemirror-theme-github"
import { sublime } from "@uiw/codemirror-theme-sublime"
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

export const DIFFICULTY_COLORS = {
  "EASY": "#39cce9",
  "MEDIUM": "#e9b139",
  "HARD": "#e95039"
}

export const EDITOR_THEME_OPTIONS = [
  {
    name: "atomone",
    value: atomone,
  },
  {
    name: "darcula",
    value: darcula,
  },
  {
    name: "dracula",
    value: dracula,
  },
  {
    name: "duotone dark",
    value: duotoneDark
  },
  {
    name: "github dark",
    value: githubDark
  },
  {
    name: "sublime",
    value: sublime
  }
]

export const EDITOR_LANGUAGE_OPTIONS = [
  {
    name: "Java",
    value: { language: java },
  },
  {
    name: "Javascript",
    value: { language: javascript },
  },
  {
    name: "Python",
    value: { language: python },
  }
]