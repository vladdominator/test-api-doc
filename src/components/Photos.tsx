import React, { useEffect, useMemo, useState } from "react";
import { defaultLimit, defaultPage } from "../common/defaultValues";
import { Buttons } from "./Buttons";

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
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);

  const getPhotos = async (page: number, limit: number) => {
    const response = await fetch(
      `http://jsonplaceholder.typicode.com/photos/?_page=${page}&_limit=${limit}`
    );
    pageTotalCount = Number(response.headers.get("X-Total-Count")) / limit;
    const data = await response.json();
    setPhotos(data);
  };

  const validatePage = (page: number) => {
    if (page > pageTotalCount) {
      setCurrentPage(1);
    } else if (page <= 0) {
      setCurrentPage(pageTotalCount);
    } else {
      setCurrentPage(page);
    }
  };

  useMemo(() => {
    getPhotos(currentPage, defaultLimit);
  }, [currentPage]);

  return (
    <main>
      <div className="container__photos">
        {photos.map((item: IPhotos) => (
          <div className="photo" key={item.id}>
            <p className="photo__title">{item.title}</p>
            <img src={item.thumbnailUrl} alt={item.title} />
          </div>
        ))}
      </div>
      <Buttons setCurrentPage={validatePage} page={currentPage} />
    </main>
  );
};

export { Photos };
