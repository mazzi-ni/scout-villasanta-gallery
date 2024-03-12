import React, { useEffect, useState } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import axios from "axios";
import { Album } from "../types/album.type";
import { Loader } from "../components/loader.component";
import { AlbumGallery } from "../components/album-gallery.component";
import { SelectBar } from "../components/select-bar.component";

const options = [
  { label: "Tutte", value: "tutte", selected: true },
  { label: "LC", value: "LC", selected: false },
  { label: "EG", value: "EG", selected: false },
  { label: "RS", value: "RS", selected: false },
  { label: "COCA", value: "COCA", selected: false },
];

function Foto() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [visibleAlbums, setVisibleAlbums] = useState<Album[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://opensheet.elk.sh/1Y-WurqEckwVkpdKseKCaLjp0LjjiVLWRUDzZQtZ-L_A/photos"
      )
      .then((res) => {
        setAlbums(res.data);
        setVisibleAlbums(res.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AlbumGallery albums={visibleAlbums} />
          <SelectBar
            options={options}
            setAlbums={setVisibleAlbums}
            onFilter={(v) => {
              console.log(v);
              if (v === "tutte") setVisibleAlbums(albums);
              else
                setVisibleAlbums(albums.filter((album) => album.branca === v));
            }}
          />
        </>
      )}
    </>
  );
}

export default Foto;
