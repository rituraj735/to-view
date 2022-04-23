import React from "react";
import { useHistory } from "react-router-dom";
import { useEntryContext } from "../context/entry/entryState";
import {
  setTagFilter,
  removeEntry,
  setEditValues,
  toggleStarEntry,
  toggleViewEntry,
} from "../context/entry/EntryReducer";
