
'use client';

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
   const router = useRouter();
  const closeModal = () => {
    router.back();
  };

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={closeModal}>
      <div className={css.container}>
        {isLoading && <p>Loading note...</p>}
        {isError && <p>Error loading note.</p>}

        {note && (
          <div className={css.item}>
            <button className={css.backBtn} onClick={closeModal}>
              ← Back
            </button>

            <div className={css.header}>
              <h2>{note.title}</h2>
              {note.tag && <span className={css.tag}>{note.tag}</span>}
            </div>

            <p className={css.content}>{note.content}</p>

            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
