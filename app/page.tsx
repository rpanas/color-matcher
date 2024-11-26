'use client';

import Search, { SearchValue } from "@/app/_components/Search";
import ColorsList from "@/app/_components/ColorsList";
import { DragEventHandler, useEffect, useState } from "react";
import Color from "@/app/_interfaces/Color";
import delayExecution from "@/app/_utils/delayExecution";

import "./styles/drop-area.css";
import { hexRegex } from "@/app/_utils/findClosestColorTo";

async function getColors(): Promise<Color[]> {
  return fetch('/api/colors', { method: 'GET' }).then(res => res.json());
}

export default function Home() {
  const [filters, setFilters] = useState<SearchValue>({ searchQuery: '', minPercent: 70 });
  const [colors, setColors] = useState<Color[]>([]);
  const [fileDragged, setFileDragged] = useState(false);

  useEffect(() => {

    getColors().then((data) => setColors(data));

  }, []);


  useEffect(() => {

    if (hexRegex.exec(filters.searchQuery)) {
      delayExecution(() => {
        fetch(`/api/colors/${filters.searchQuery}/closest?min-percent=${filters.minPercent}`, {
          method: 'GET'
        }).then((response) => response.json())
          .then(setColors);
      }, 300);
    } else if (!filters.searchQuery) {
      delayExecution(() => {
        getColors().then((data) => setColors(data));
      }, 0);
    }
  }, [filters.minPercent, filters.searchQuery]);


  const handleSearchChange = (value: SearchValue): void => {
    setFilters(value);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setFileDragged(true);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const fd = new FormData();

    const file = e.dataTransfer.files.item(0);

    if (!file) {
      handleDragLeave();
      return;
    }

    // const fileReader = new FileReader();

    /*fileReader.onload = () => {
    }*/

    fd.append('file', new Blob([file]));

    fetch("/api/colors", {
      method: "POST",
      body: fd,
    })
      .then((response) => {
        return response.json();
      })
      .then((colors) => {
        setFilters({
          searchQuery: '',
          minPercent: filters.minPercent
        });
        setColors(colors);
      })
    handleDragLeave()
  };

  const handleDragLeave = () => {
    setFileDragged(false);
  };


  return (
    <div
      className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragLeave}
    >
      <div className="background-gradient">
        <div className="bg-blur"></div>
      </div>
      <header className="w-full">
        <Search
          placeholder="f3f3f3"
          value={filters}
          onChange={handleSearchChange}
        />
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full mt-10">
        <ColorsList colors={colors}/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      {
        fileDragged && (
          <div className="drop-area">
            <div className="background"></div>
            <span className="z-40">Please your file here</span>
          </div>
        )
      }
    </div>
  );
}
