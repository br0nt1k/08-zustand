"use client";

import css from "./NotesPage.module.css";
import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
// import Modal from '@/components/Modal/Modal';
import { fetchNotes, NotesResponse } from "@/lib/api";
// import NoteForm from '@/components/NoteForm/NoteForm';
import Link from "next/link";

type NotesClientProps = {
  initialData: NotesResponse;
  tag?: string;
};

const NotesClient = ({ initialData, tag }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes(
        debouncedSearchQuery || "",
        currentPage,
        tag === "all" ? "" : tag
      ),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === 1 && !debouncedSearchQuery ? initialData : undefined,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchQuery={searchQuery} onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={data.totalPages}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default NotesClient;
