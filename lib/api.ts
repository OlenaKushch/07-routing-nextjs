import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface URLResponse {
  notes: Note[],
  totalPages: number
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  },
});

export type FetchNotesParams = {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | 'all';
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag

}: FetchNotesParams): Promise<URLResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim() !== '') params.search = search;
  if (tag && tag !== 'all') params.tag = tag;

  const { data } = await api.get<URLResponse>('/notes', { params });
  return data;
};

export interface NewNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const res = await api.post<Note>("/notes", newNoteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};
export type Tags = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
