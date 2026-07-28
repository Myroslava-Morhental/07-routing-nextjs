'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.client.module.css';

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const noteQ = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (noteQ.isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (noteQ.isError || !noteQ.data) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{noteQ.data.title}</h2>
          </div>
          <p className={css.tag}>{noteQ.data.tag}</p>
          <p className={css.content}>{noteQ.data.content}</p>
          <p className={css.date}>{noteQ.data.createdAt}</p>
        </div>
      </div>
    </main>
  );
}
export default NoteDetailsClient;
