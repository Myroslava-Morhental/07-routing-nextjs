'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.client.module.css';

interface NotePreviewClientProps {
  id: string;
}

function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const noteQ = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (noteQ.isLoading) {
    return (
      <Modal onClose={closeModal}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  }

  if (noteQ.isError || !noteQ.data) {
    return (
      <Modal onClose={closeModal}>
        <p>Something went wrong</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={closeModal}>
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
    </Modal>
  );
}

export default NotePreviewClient;
