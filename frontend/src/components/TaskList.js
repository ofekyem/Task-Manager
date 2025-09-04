import React, { useEffect, useMemo, useState } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const PAGE_SIZE = 3; // show 3 each scroll

// In this Function we split the array into chunks of a given size
function chunk(arr, size){
    const out = [];
    for(let i = 0; i < arr.length; i += size){
        out.push(arr.slice(i, i + size));
    }
    return out;
}

// In this function we get a list of items in the page and we pad it to the size so that it always has the same number of items
function padToSize(page, size){
    const copy = [...page];
    while(copy.length < size){
        copy.push(null);
    }
    return copy;
}

// This is the component TaskList that displays a list of tasks in carousela
function TaskList({ tasks, onDelete, onToggle, onUpdate }) {
    const [index, setIndex] = useState(0); 
    const [animate] = useState(true); // This state controls the animation of scrolling

  // We take the existing tasks and split them into chunks of PAGE_SIZE
    const rawPages = useMemo(() => {
        const pages = chunk(tasks, PAGE_SIZE);
        return pages.length ? pages : [[]];
    }, [tasks]);

  // We pad the page to the Page_Size so if there are less than it, it will fill nulls
    const pages = useMemo(
        () => rawPages.map((p) => padToSize(p, PAGE_SIZE)),
        [rawPages]
    );
    const P = pages.length;

    // If the number of pages P changes, we go back to 0
    useEffect(() => {
        setIndex(0);
    }, [P]);


    // When clicking next/prev, we want to change the index to show the next/prev Page_size tasks 
    const goNext = () => setIndex((i) => (i + 1) % P);
    const goPrev = () => setIndex((i) => (i - 1 + P) % P);

    return (
        <div className="carousela-root">
            {/* go back arrow */}
            <button className="carousela-arrow left" onClick={goPrev} aria-label="Previous">
                &lt;
            </button>

            <div className="carousela-viewport">
                <div
                    className={`carousela-track ${animate ? "animate" : ""}`}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {pages.map((page, pageIdx) => (
                        <div className="carousela-page" key={`page-${pageIdx}`}>
                            {page.map((task, slotIdx) =>
                                task ? (
                                <div className="carousela-item" key={`task-${task.id}`}>
                                    <TaskItem
                                        task={task}
                                        onDelete={onDelete}
                                        onToggle={onToggle}
                                        onUpdate={onUpdate}
                                    />
                                </div>
                                ) : (
                                <div
                                    className="carousela-item placeholder"
                                    key={`ph-${pageIdx}-${slotIdx}`}
                                    aria-hidden="true"
                                />
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
             {/* go forward arrow */}
            <button className="carousela-arrow right" onClick={goNext} aria-label="Next">
                &gt;
            </button> 

        </div>
    );
}

export default TaskList;
