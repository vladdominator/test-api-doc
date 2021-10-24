import React, { useEffect, useMemo, useRef, useState } from "react";
import { defaultLimit, defaultPage } from "../common/defaultValues";
import { Buttons } from "./Buttons";
import { Input } from "./Input";
import { Modal } from "./Modal";

export interface IPhotos {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

let pageTotalCount: number;

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(Number(defaultPage));
  const [process, setProcess] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<IPhotos>();
  const [filter, setFilter] = useState<string>("");
  const input = useRef<HTMLInputElement>(null);

  const getPhotos = async (page: number, limit: number) => {
    setProcess(true);
    const response = await fetch(
      `http://jsonplaceholder.typicode.com/photos/?_page=${page}&_limit=${limit}`
    );
    pageTotalCount = Number(response.headers.get("X-Total-Count")) / limit;
    const data = await response.json();
    setProcess(false);
    setPhotos(data);
  };

  const upModal = (item: IPhotos) => {
    setModalContent(item);
    setModal(true);
  };

  const validatePage = (page: number) => {
    if (page > pageTotalCount) {
      setCurrentPage(1);
    } else if (page <= 0) {
      setCurrentPage(pageTotalCount);
    } else {
      setCurrentPage(page);
    }
    localStorage.setItem("page", String(page));
  };

  const setFilterItems = async (filter: string) => {
    if (filter) {
      setProcess(true);
      const response = await fetch(
        `http://jsonplaceholder.typicode.com/photos`
      );
      const data: IPhotos[] = (await response.json()).filter(
        (item: IPhotos) => item.albumId === Number(filter)
      );
      setProcess(false);
      setPhotos(data);
    } else {
      getPhotos(currentPage, defaultLimit);
    }
  };

  useEffect(() => {
    setFilterItems(filter);
  }, [filter]);

  const deletePhoto = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
      method: "DELETE",
    });
    getPhotos(currentPage, defaultLimit);
  };

  useMemo(() => {
    getPhotos(currentPage, defaultLimit);
  }, [currentPage]);

  return (
    <main>
      {process ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <Modal setVisible={setModal} isVisible={modal} item={modalContent} />
          <Input filter={filter} setFilter={setFilter} />
          <div className="container__photos">
            {photos.map((item: IPhotos) => (
              <div
                className="photo"
                key={item.id}
                onClick={() => upModal(item)}
              >
                <p className="photo__title">{item.title}</p>
                <img src={item.thumbnailUrl} alt={item.title} />
                <button
                  className="photo__delete_button"
                  onClick={(e) => deletePhoto(e, item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {filter ? (
            ""
          ) : (
            <Buttons setCurrentPage={validatePage} page={currentPage} />
          )}
        </>
      )}
    </main>
  );
};

export { Photos };
