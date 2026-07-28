import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNotePayload): Promise<Note> {
  const response = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    {
      title,
      content,
      tag,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search?: string,
  perPage?: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: {
    page: number;
    search?: string;
    perPage?: number;
    tag?: string;
  } = {
    page,
  };
  if (search) {
    params.search = search;
  }
  if (perPage !== undefined) {
    params.perPage = perPage;
  }
  if (tag) {
    params.tag = tag;
  }

  const { data } = await axios.get<FetchNotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      params,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}
