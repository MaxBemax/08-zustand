import axios from 'axios';
import type { CreateNoteFields, Note, NoteTag } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!API_TOKEN) {
  throw new Error('NEXT_PUBLIC_NOTEHUB_TOKEN is not defined');
}

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
};

export async function fetchNotes(
  page: number = 1,
  perPage: number = 12,
  search: string = '',
  tag?: NoteTag
): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>(BASE_URL, {
    headers,
    params: {
      page,
      perPage,
      search,
      ...(tag ? { tag } : {}),
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${BASE_URL}/${id}`, { headers });
  return data;
}

export async function createNote(note: CreateNoteFields): Promise<Note> {
  const { data } = await axios.post<Note>(BASE_URL, note, { headers });
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`${BASE_URL}/${id}`, { headers });
  return data;
}
