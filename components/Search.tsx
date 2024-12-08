"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { fetchFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const router = useRouter();
  const path = usePathname();

  const [debounceQuery] = useDebounce(query, 300);

  useEffect(() => {
    const getFiles = async () => {
      const files = await fetchFiles({ types: [], searchText: debounceQuery });
      return files.documents === undefined ? [] : files.documents;
    };

    if (debounceQuery.length === 0) {
      setOpen(false);
      setResults([]);
      return router.push(path.replace(searchParams.toString(), ""));
    }

    getFiles().then((result: Models.Document[]) => {
      setOpen(true);
      setResults(result);
    });
  }, [debounceQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`,
    );
  };
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((file: Models.Document) => (
                <li
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                  className="flex items-center justify-between"
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>
                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <li className="empty-result">No files found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
