'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteList.module.css';
import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              type="button"
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={deleteNoteMutation.isPending}
            >
              Delete
            </button>
            {deleteNoteMutation.isError && (
              <p className={css.error}>Failed to delete note</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
